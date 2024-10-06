import React from "react";
import useVoiceChat from "../hooks/useVoiceChat";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import useMarvinAvatar from "../hooks/useMarvinAvatar";
import { Mic, Power, Volume2 } from "lucide-react";
import CurvedText from "@/components/ui/curvedText";

const ConnectedChat: React.FC = () => {
  const {
    isRecording,
    isConnected,
    isTalking,
    connectConversation,
    startRecording,
    stopRecording,
    currentTool,
  } = useVoiceChat();

  return (
    <div className="flex flex-col items-center justify-between p-4 h-full">
      <div></div>
      <div className="flex flex-col items-center w-full">
        <Avatar
          isTalking={isTalking}
          isConnected={isConnected}
          isRecording={isRecording}
        />
        {currentTool}
      </div>

      <div className="mb-24 relative">
        <div className="relative">
          {!isConnected ? (
            <>
              <Button
                className="bg-red-400 hover:bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center"
                onClick={connectConversation}
              >
                <Power className="w-6 h-6" />
              </Button>
              <CurvedText text={"Wake me up..."} />
            </>
          ) : (
            <>
              <Button
                className="bg-yellow-500 hover:bg-yellow-400 text-white w-20 h-20 rounded-full flex items-center justify-center select-none"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                onContextMenu={(e) => e.preventDefault()}
              >
                <Mic className="w-6 h-6" />
              </Button>
              <CurvedText
                text={isRecording ? "Recording..." : "Hold to talk"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectedChat;
