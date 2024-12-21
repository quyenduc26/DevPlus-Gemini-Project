"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { BotInfoType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Message Components
const MessageItem = ({
  message,
  index,
}: {
  message: { role: string; content: string };
  index: number;
}) => (
  <div
    key={index}
    className={`flex items-start space-x-2 mb-4 
      ${message.role === "user" ? "justify-end" : "justify-start"}`}
  >
    {message.role === "bot" && <Bot className="w-6 h-6 mt-1" />}
    <div
      className={`p-3 rounded-lg 
        ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    >
      {message.role === "bot" ? (
        <ReactMarkdown className="markdown-content">
          {message.content}
        </ReactMarkdown>
      ) : (
        message.content
      )}
    </div>
    {message.role === "user" && <User className="w-6 h-6 mt-1" />}
  </div>
);

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
    { role: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { handleAIResponse } = useAIService();
  const { fetchBotInfo } = useBotService();

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
    ]);

    const aiResponse = await handleAIResponse(inputMessage);
    setChatHistory((prev) => [...prev, { role: "bot", content: aiResponse }]);

    setIsLoading(false);
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
    <div className="container mx-auto p-4 max-w-4xl">
      <div ref={chatContainerRef} className="h-full p-4 mb-4">
        {chatHistory.map((message, index) => (
          <MessageItem key={index} message={message} index={index} />
        ))}
      </div>
      <div className="p-6 bg-gray-50 border rounded-xl">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Message Gemini Vietnam"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
