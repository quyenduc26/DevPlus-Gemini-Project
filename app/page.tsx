"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BotInfoType } from "@/types";
import { ChatMessages } from "@/components/chat-list";
import { ChatInput } from "@/components/chat";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// AI Service
const useAIService = () => {
  const handleAIResponse = async (userMessage: string) => {
    try {
      const aiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(aiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        generationConfig,
      });

      return result.response.text();
    } catch (error) {
      console.error("Error interacting with Gemini AI:", error);
      return "Sorry, I have some error. Please try again.";
    }
  };

  return { handleAIResponse };
};

// Bot Service
const useBotService = () => {
  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + "/botInfo");
      return response.data;
    } catch (error) {
      console.error("Error fetching bot info:", error);
      return null;
    }
  };

  return { fetchBotInfo };
};

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
