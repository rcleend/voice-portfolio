"use client";

import ConnectedChat from "@/features/chat/connected";

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center">
      <ConnectedChat />
    </main>
  );
}
