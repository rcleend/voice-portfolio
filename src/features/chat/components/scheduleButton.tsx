"use client";
import { useMouseMove } from "@/features/chat/hooks/useMouseAnimation";
import React, { useRef } from "react";

const ScheduleButton: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { isHovered, position, handleMouseEnter, handleMouseLeave } =
    useMouseMove(linkRef);

  return (
    <div className="w-full flex items-center justify-center h-[50vh]">
      <div className="mx-auto h-20 w-full max-w-72 bg-black rounded-full relative ">
        <a
          ref={linkRef}
          href="https://calendly.com/rcleende/30min"
          target="_blank"
          className={`group flex h-full w-full items-center justify-between border-2 border-black bg-white px-8 text-xl font-semibold rounded-full absolute transition-all duration-300 ease-out shadow-xl ${
            isHovered ? "shadow-lg scale-110" : ""
          }`}
          style={{
            transform: isHovered
              ? `translate(${position.x}px, ${position.y - 20}px) scale(1.1)`
              : "",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              SCHEDULE CALL
            </span>
            <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              SCHEDULE CALL
            </span>
          </span>
          <div className="pointer-events-none flex h-6 w-6 overflow-hidden text-2xl">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 -translate-x-full text-yellow-500 transition-transform duration-300 group-hover:translate-x-0"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ScheduleButton;
