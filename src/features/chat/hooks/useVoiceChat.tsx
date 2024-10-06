"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { WavRecorder, WavStreamPlayer } from "../../../lib/wavtools";
import { RealtimeClient } from "@openai/realtime-api-beta";
import useApiKey from "./useApiKey";
import { instructions } from "@/lib/prompt";
import { ReactNode } from "react";

const useVoiceChat = () => {
  const { apiKey } = useApiKey();
  const [canPushToTalk] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTool, setCurrentTool] = useState<ReactNode | null>(null);
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

    // TODO: Remove this
    // return;
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

  const startRecording = async () => {
    if (!clientRef.current || isRecording) return;
    setIsRecording(true);
    const { current: client } = clientRef;
    const { current: wavRecorder } = wavRecorderRef;
    const { current: wavStreamPlayer } = wavStreamPlayerRef;

    const trackSampleOffset = wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      client.cancelResponse(trackId, offset);
    }
    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  };

  const stopRecording = async () => {
    if (!clientRef.current || !isRecording) return;
    setIsRecording(false);
    const { current: client } = clientRef;
    const { current: wavRecorder } = wavRecorderRef;
    await wavRecorder.pause();
    client.createResponse();
  };

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
        name: "show_calender",
        description: "Shows the user's calender.",
        parameters: {},
      },
      async () => {
        setCurrentTool(
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold">Calender</h2>
            <p>Here is the calender of the user.</p>
          </div>
        );
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
        setCurrentTool(
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold">Resume</h2>
            <p>Here is the resume of the user.</p>
          </div>
        );

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

  return {
    canPushToTalk,
    isRecording,
    isConnected,
    isTalking,
    connectConversation,
    disconnectConversation,
    startRecording,
    stopRecording,
    currentTool,
  };
};

export default useVoiceChat;
