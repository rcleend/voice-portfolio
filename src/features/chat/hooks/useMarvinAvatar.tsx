"use client";

import { useState, useEffect, useMemo } from "react";

type MarvinState =
  | "listening"
  | "thinking"
  | "disconnected"
  | "talking"
  | "idle";

interface MarvinAvatarProps {
  isConnected: boolean;
  isRecording: boolean;
  isTalking: boolean;
}

const useMarvinAvatar = ({
  isConnected,
  isRecording,
  isTalking,
}: MarvinAvatarProps) => {
  const [state, setState] = useState<MarvinState>("disconnected");

  useEffect(() => {
    setState(
      !isConnected
        ? "disconnected"
        : isTalking
        ? "talking"
        : isRecording
        ? "listening"
        : "idle"
    );
  }, [isConnected, isRecording, isTalking]);

  const avatarSrc = useMemo(() => {
    const stateToImageMap: Record<MarvinState, string> = {
      listening: "/images/marvin.png",
      thinking: "/images/marvin.png",
      disconnected: "/images/marvin.png",
      talking: "/images/marvin.png",
      idle: "/images/marvin.png",
    };
    return stateToImageMap[state];
  }, [state]);

  return { state, avatarSrc };
};

export default useMarvinAvatar;
