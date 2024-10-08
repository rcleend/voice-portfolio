"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { WavRecorder, WavStreamPlayer } from "../../../lib/wavtools";
import { RealtimeClient } from "@openai/realtime-api-beta";
import useApiKey from "./useApiKey";
import { instructions } from "@/lib/prompt";
import { ReactNode } from "react";
import Resume from "@/features/chat/components/resume";
import ScheduleButton from "@/features/chat/components/scheduleButton";

const useVoiceChat = () => {
  const { apiKey } = useApiKey();
  const [canPushToTalk] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTool, setCurrentTool] = useState<ReactNode | null>(
    <Resume onClose={() => setCurrentTool(null)} />
  );
  // <ScheduleButton />
  // null
  const [isTalking, setIsTalking] = useState(false);

  const startTimeRef = useRef(new Date().toISOString());
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));
  const wavStreamPlayerRef = useRef(new WavStreamPlayer({ sampleRate: 24000 }));
  const clientRef = useRef<RealtimeClient | null>(null);

  useEffect(() => {
    if (apiKey) {
      clientRef.current = new RealtimeClient({
        apiKey,
        dangerouslyAllowAPIKeyInBrowser: true,
      });
    }
  }, [apiKey]);

  const connectConversation = useCallback(async () => {
    if (!clientRef.current) return;
    const { current: client } = clientRef;
    const { current: wavRecorder } = wavRecorderRef;
    const { current: wavStreamPlayer } = wavStreamPlayerRef;

    startTimeRef.current = new Date().toISOString();
    setIsConnected(true);

    return;
    await wavRecorder.begin();
    await wavStreamPlayer.connect();
    await client.connect();

    client.sendUserMessageContent([{ type: "input_text", text: "Hello!" }]);

    if (client.getTurnDetectionType() === "server_vad") {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  }, []);

  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);

    if (clientRef.current) {
      clientRef.current.disconnect();
    }

    const { current: wavRecorder } = wavRecorderRef;
    await wavRecorder.end();

    const { current: wavStreamPlayer } = wavStreamPlayerRef;
    wavStreamPlayer.interrupt();
  }, []);

  /**
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events and more
   */
  useEffect(() => {
    if (!clientRef.current) return;

    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const client = clientRef.current;

    // Set instructions
    client.updateSession({
      instructions,
      voice: "echo",
      input_audio_transcription: { model: "whisper-1" },
      turn_detection: { type: "server_vad" },
    });

    // client.addTool(
    //   {
    //     name: "abuse_prevention",
    //     description: "Prevents the user from saying harmful things.",
    //     parameters: {},
    //   },
    //   async () => {
    //     return { ok: true };
    //   }
    // );
    client.addTool(
      {
        name: "good_bye",
        description:
          "Use this tool whenever the user says goodbye and wants to end the conversation.",
        parameters: {},
      },
      async () => {
        setTimeout(() => {
          setCurrentTool(null);
          disconnectConversation();
        }, 4000);
        return { ok: true };
      }
    );
    client.addTool(
      {
        name: "schedule_call",
        description: "Shows a button which can be used to schedule a call.",
        parameters: {},
      },
      async () => {
        setCurrentTool(<ScheduleButton />);
        return { ok: true };
      }
    );
    client.addTool(
      {
        name: "show_resume",
        description: "Shows the user's resume.",
        parameters: {},
      },
      async () => {
        setCurrentTool(<Resume onClose={() => setCurrentTool(null)} />);

        return { ok: true };
      }
    );

    client.on("error", (event: any) => console.error(event));
    client.on("conversation.interrupted", async () => {
      const trackSampleOffset = wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        client.cancelResponse(trackId, offset);
        setIsTalking(false);
      }
    });
    client.on("conversation.updated", async ({ item, delta }: any) => {
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
        setIsTalking(true);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;

        // Set a timeout to set isTalking to false after Marvin's audio finishes
        if (item.role === "assistant") {
          // Calculate the duration of the audio in milliseconds
          const audioDurationMs = (item.formatted.audio.length / 24000) * 1000;
          setTimeout(() => {
            setIsTalking(false);
          }, audioDurationMs);
        }
      }
    });

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, [apiKey]);

  const sendTextMessage = (input: string) => {
    if (!clientRef.current) return;
    clientRef.current.sendUserMessageContent([
      { type: "input_text", text: input },
    ]);
  };

  return {
    canPushToTalk,
    isRecording,
    isConnected,
    isTalking,
    connectConversation,
    disconnectConversation,
    currentTool,
    sendTextMessage,
  };
};

export default useVoiceChat;
