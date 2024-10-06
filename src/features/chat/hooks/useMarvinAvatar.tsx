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

  return { state };
};

export default useMarvinAvatar;
