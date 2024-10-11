"use client";

import { useState, useEffect, useMemo } from "react";

type MarvinState = "thinking" | "disconnected" | "talking" | "idle";

interface MarvinAvatarProps {
  isConnected: boolean;
  isTalking: boolean;
}

const useMarvinAvatar = ({ isConnected, isTalking }: MarvinAvatarProps) => {
  const [state, setState] = useState<MarvinState>("disconnected");

  useEffect(() => {
    setState(!isConnected ? "disconnected" : isTalking ? "talking" : "idle");
  }, [isConnected, isTalking]);

  return { state };
};

export default useMarvinAvatar;
