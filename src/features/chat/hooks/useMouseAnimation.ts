import { useState, useEffect, RefObject } from "react";

interface Position {
  x: number;
  y: number;
}

export const useMouseMove = (
  ref: RefObject<HTMLElement>,
  maxDistance: number = 20
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = (e.clientX - centerX) / 10;
        const dy = (e.clientY - centerY) / 10;

        setPosition({
          x: Math.max(-maxDistance, Math.min(maxDistance, dx)),
          y: Math.max(-maxDistance, Math.min(maxDistance, dy)),
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, ref, maxDistance]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return {
    isHovered,
    position,
    handleMouseEnter,
    handleMouseLeave,
  };
};
