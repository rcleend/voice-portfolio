import React from "react";
import useVoiceChat from "../hooks/useVoiceChat";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Mic, Power } from "lucide-react";
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
    <div className="flex flex-col items-center justify-between p-4 h-full w-full max-w-[600px]">
      <div></div>
      <div className="relative flex flex-col items-center w-full ">
        <Avatar
          isTalking={isTalking}
          isConnected={isConnected}
          isRecording={isRecording}
          shrink={currentTool ? true : false}
        />
        {currentTool && <div className="w-full h-96">{currentTool}</div>}
      </div>
      <div></div>

      <div className="fixed bottom-0 left-0 right-0 pb-20 flex justify-center">
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
