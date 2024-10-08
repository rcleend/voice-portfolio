"use client";
import { useMouseMove } from "@/features/chat/hooks/useMouseAnimation";
import React, { useRef } from "react";

interface SocialButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
  bgColor: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  text,
  icon,
  bgColor,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { isHovered, position, handleMouseEnter, handleMouseLeave } =
    useMouseMove(linkRef);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-auto h-12 w-full rounded-full relative shadow-md">
        <a
          ref={linkRef}
          href={href}
          target="_blank"
          className={`group flex h-full w-full items-center justify-center sm:justify-between ${bgColor} px-4 text-sm font-semibold rounded-full absolute transition-all duration-300 ease-out shadow-md ${
            isHovered ? "shadow-lg scale-105" : ""
          }`}
          style={{
            transform: isHovered
              ? `translate(${position.x}px, ${position.y}px) scale(1.05)`
              : "",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="relative overflow-hidden text-white">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              {text}
            </span>
            <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              {text}
            </span>
          </span>
          <div className="pointer-events-none hidden sm:flex h-5 w-5 overflow-hidden text-xl">
            {React.cloneElement(icon as React.ReactElement, {
              width: "100%",
              height: "100%",
              className:
                "shrink-0 -translate-x-full text-white transition-transform duration-300 group-hover:translate-x-0",
            })}
            {React.cloneElement(icon as React.ReactElement, {
              width: "100%",
              height: "100%",
              className:
                "shrink-0 -translate-x-full text-white transition-transform duration-300 group-hover:translate-x-0",
            })}
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialButton;
