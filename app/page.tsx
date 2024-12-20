'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatMessages } from '@/components/chat-list';
import { ChatInput } from '@/components/chat'; 
import { BotInfoType } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export default function ChatInterface() {
  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');

  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + '/botInfo');
      setBot(response.data);
    } catch (error) {
      console.error('Error fetching bot info:', error);
    }
  };

  useEffect(() => {
    fetchBotInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'This is a demo response. The actual integration with an AI model would go here.',
        },
      ]);
    }, 1000);
    setInput('');
  };

  if (!bot) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[83vh]">
      {/* ChatMessages Component */}
      <ChatMessages bot={bot} messages={messages} />

      {/* ChatInput Component */}
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </div>
  );
}
