"use client";
import React, { useEffect } from "react";

// TODO: move this to a global type declaration
declare global {
  interface Window {
    Calendly?: any;
  }
}

const Calendar: React.FC = () => {
  useEffect(() => {
    // Initialize Calendly widget
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/rcleende",
        parentElement: document.getElementById("calendly-inline-widget"),
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <div className="bg-white p-4 rounded-md h-full overflow-scroll">
      <div
        id="calendly-inline-widget"
        style={{ minWidth: "320px", height: "630px" }}
      />
    </div>
  );
};

export default Calendar;
