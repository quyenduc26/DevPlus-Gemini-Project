"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { BotInfoType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Fetch bot info from server
  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + "/botInfo");
      setBot(response.data);
    } catch (error) {
      console.error("Error fetching bot info:", error);
    }
  };

  // Handle submit to AI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
    ]);

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai"); //Dynamic import
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
        contents: [{ role: "user", parts: [{ text: inputMessage }] }],
        generationConfig,
      });

      const aiResponse = result.response.text();
      setChatHistory((prev) => [...prev, { role: "bot", content: aiResponse }]);
    } catch (error) {
      console.error("Error interacting with Gemini AI:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I have some error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInputMessage("");
    }
  };

  useEffect(() => {
    fetchBotInfo();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  if (!bot) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div
        ref={chatContainerRef}
        className="h-full p-4 mb-4"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "bot" && <Bot className="w-6 h-6 mt-1" />}
            <div
              className={`p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {message.content}
            </div>
            {message.role === "user" && <User className="w-6 h-6 mt-1" />}
          </div>
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
