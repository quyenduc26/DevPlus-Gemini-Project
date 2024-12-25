"use client";

import { useEffect, useState, useRef } from "react";
import { BotInfoType, ChatMessageType, ChatSectionType, UserType } from "@/types";
import { ChatMessages } from "@/components/chat-list";
import { ChatInput } from "@/components/chat";
import { useAIService, useBotService, useUserService, useSectionService } from "./hooks";
import ToastManager from "@/components/ui/ToastManager";
import axios from "axios";
import { useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
  const { data: session } = useSession();

  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [users, setUsers] = useState<UserType[] | []>([]);
  const [chatSection, setChatSection] = useState<ChatSectionType| null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessage, setChatMessage] = useState<{ role: "user" | "assistant", content: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { handleAIResponse } = useAIService();
  const { fetchBotInfo } = useBotService();
  const { fetchUserData } = useUserService();
  const { createNewChatSection } = useSectionService();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = users.find(user => user.email == session?.user?.email)?.id;
  
    if (!inputMessage.trim()) return;
  
    try {
      let currentSection = chatSection;
  
      // Tạo mới section nếu chưa có
      if (userId) {
        const sectionInfo = await createNewChatSection(inputMessage, userId);
        setChatSection(sectionInfo); 
        currentSection = sectionInfo; 
      }
  
      setChatMessage((prev) => [
        ...prev,
        { role: "user", content: inputMessage },
      ]);
  
      await axios.post<ChatMessageType[]>(`${API_BASE_URL}/chatMessages`, {
        role: "user",
        content: inputMessage,
        timestamp: Date.now(),
        sectionId: currentSection?.id,
      });
  
      setInputMessage("");
  
      // Xử lý phản hồi từ AI
      const aiResponse = await handleAIResponse(inputMessage);
      setChatMessage((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
  
      // Gửi message từ AI
      await axios.post<ChatMessageType[]>(`${API_BASE_URL}/chatMessages`, {
        role: "assistant",
        content: aiResponse,
        timestamp: Date.now(),
        sectionId: currentSection?.id,
      });
    } catch (error) {
      setToastMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setToastOpen(true);
    }
  };
  

  useEffect(() => {
    const init = async () => {
      try {
        const botInfo = await fetchBotInfo();
        const userData = await fetchUserData();
        setBot(botInfo);
        setUsers(userData);
      } catch (error) {
        setToastMessage(
          error instanceof Error ? error.message : "Something went wrong"
        );
        setToastOpen(true);
      }
    };
    init();
  }, [chatSection]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessage]);

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
      <ChatMessages bot={bot} messages={chatMessage} />
      <ChatInput
        input={inputMessage}
        setInput={setInputMessage}
        handleSubmit={handleSubmit}
      />
      <ToastManager
        message={toastMessage}
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
