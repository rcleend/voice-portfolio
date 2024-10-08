import React, { useRef } from "react";
import { useMouseMove } from "@/features/chat/hooks/useMouseAnimation";
import CurvedText from "./curvedText";
import { Power } from "lucide-react";
import { motion } from "framer-motion";

const ConnectButton: React.FC<{ onConnectClick: () => void }> = ({
  onConnectClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isHovered, position, handleMouseEnter, handleMouseLeave } =
    useMouseMove(buttonRef);

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        className={`w-20 h-20 rounded-full bg-red-500 flex items-center justify-center focus:outline-none shadow-xl transition-all duration-300 ease-out ${
          isHovered ? "shadow-lg scale-110" : ""
        }`}
        onClick={onConnectClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `translate(${position.x}px, ${position.y}px) scale(1.1)`
            : "",
        }}
      >
        <Power className="w-6 h-6 text-white" />
      </motion.button>
      <CurvedText text={"Wake me up..."} />
    </div>
  );
};

export default ConnectButton;
