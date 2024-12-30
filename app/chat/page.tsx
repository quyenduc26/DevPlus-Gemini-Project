'use client'
import { useEffect, useState, useRef } from "react";
import { BotInfoType, ChatMessageType, ChatSectionType, UserType } from "@/types";
import { ChatMessages } from "@/components/chat-list";
import { ChatInput } from "@/components/chat";
import { useAIService, useBotService, useUserService, useSectionService, useMessageService } from "../hooks";
import ToastManager from "@/components/ui/ToastManager";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'
import { BOT_ROLE, USER_ROLE } from "@/constants";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

export default function Page() {
  const { data: session } = useSession();

  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [users, setUsers] = useState<UserType[] | []>([]);
  const [chatSection, setChatSection] = useState<ChatSectionType | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: typeof USER_ROLE | typeof BOT_ROLE; content: string }[]
  >([])
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { handleAIResponse } = useAIService();
  const { fetchBotInfo } = useBotService();
  const { fetchUserData } = useUserService();
  const { fetchSectionData, createNewChatSection, updateSectionTitle } = useSectionService();
  const { fetchMessage } = useMessageService();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const chatId = useSearchParams().get("id");

  const init = async () => {
    try {
      console.log(session);
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

  const getDataMessage = async () => {
    if (!chatId) {
      setToastMessage("Chat ID is missing");
      setToastOpen(true);
      return;
    }
    try {
      const messages = await fetchMessage(chatId);
      const sectionData = await fetchSectionData();
      const sectionInfo = sectionData.find(item => item.id === chatId);
      const userId = users.find(user => user.email === session?.user?.email)?.id;
      if (userId && sectionInfo) {
        setChatHistory(messages);
        setChatSection(sectionInfo);
      }
    } catch (error) {
      setToastMessage(
        error instanceof Error ? error.message : "Failed to fetch messages"
      );
      setToastOpen(true);
    }
  };

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    if(chatHistory.length == 0 && chatSection){
      console.log(chatSection?.id, inputMessage)
      updateSectionTitle(chatSection?.id, inputMessage)
    }
    const userId = users.find(user => user.email === session?.user?.email)?.id;
    try {
      if (!chatSection && userId) {
        const sectionInfo = await createNewChatSection(inputMessage, userId);
        setChatSection(sectionInfo);
      }
    } catch (error) {
      throw error;
    }

    setChatHistory(prev => [...prev, { role: USER_ROLE, content: inputMessage }])

    try {
      await axios.post<ChatMessageType[]>(`${API_BASE_URL}/chatMessages`, {
        role: "user",
        content: inputMessage,
        timestamp: Date.now(),
        sectionId: chatSection?.id
      });
      setInputMessage("");
    } catch (error) {
      throw error
    }

    try {
      const aiResponse = await handleAIResponse(inputMessage, chatHistory)
      setChatHistory(prev => [...prev, { role: BOT_ROLE, content: aiResponse }])

      await axios.post<ChatMessageType[]>(`${API_BASE_URL}/chatMessages`, {
        role: "assistant",
        content: aiResponse,
        timestamp: Date.now(),
        sectionId: chatSection?.id
      });
    } catch (error) {
      setToastMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setToastOpen(true);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getDataMessage();
  }, [chatId, session]);

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
      <ChatMessages bot={bot} messages={chatHistory} />
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
  )
}
