"use client";

import { useEffect, useState, useRef } from "react";
import { BotInfoType } from "@/types";
import { ChatMessages } from "@/components/chat-list";
import { ChatInput } from "@/components/chat";
import { useAIService, useBotService } from "./hooks";

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { handleAIResponse } = useAIService();
  const { fetchBotInfo } = useBotService();

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
    ]);

    const aiResponse = await handleAIResponse(inputMessage);
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: aiResponse },
    ]);
    setInputMessage("");
  };

  // Effects
  useEffect(() => {
    const initBot = async () => {
      const botInfo = await fetchBotInfo();
      setBot(botInfo);
    };
    initBot();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Loading
  if (!bot) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render
  return (
    <div className="flex flex-col h-[85vh]">
      {/* ChatMessages Component */}
      <ChatMessages bot={bot} messages={chatHistory} />
      {/* ChatInput Component */}
      <ChatInput
        input={inputMessage}
        setInput={setInputMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
