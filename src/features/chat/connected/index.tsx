import React, { useState } from "react";
import useVoiceChat from "../hooks/useVoiceChat";
import { Avatar } from "@/features/chat/components/avatar";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "@/features/chat/components/menu";
import ConnectButton from "../components/connectButton";

const ConnectedChat: React.FC = () => {
  const {
    isConnected,
    isTalking,
    isMuted,
    connectConversation,
    currentTool,
    sendTextMessage,
    toggleMute,
  } = useVoiceChat();

  return (
    <div className="flex flex-col items-center justify-between p-4 h-full w-full">
      <div></div>
      <div className="relative flex flex-col items-center w-full">
        <Avatar
          isTalking={isTalking}
          isConnected={isConnected}
          shrink={currentTool ? true : false}
        />

        <AnimatePresence>
          {currentTool && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { delay: 0, duration: 0.5 },
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.7, // Delay to start after height transition
                  duration: 0.5,
                  ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for bouncy effect
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: {
                    duration: 0.5,
                    delay: 0,
                    ease: [0.175, 0.885, 0.32, 1.275],
                  },
                }}
                className="w-full h-full"
              >
                {currentTool}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div></div>

      <div className="fixed bottom-0 left-0 right-0 pb-20 flex justify-center">
        <div className="relative">
          {!isConnected ? (
            <>
              <ConnectButton onConnectClick={connectConversation} />
            </>
          ) : (
            <>
              <Menu
                onMenuItemClick={sendTextMessage}
                isMuted={isMuted}
                toggleMute={toggleMute}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectedChat;
