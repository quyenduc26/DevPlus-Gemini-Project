'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BotInfoType } from '@/types';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {bot ? (
        <>
          {/* Phần thông tin bot */}
          <div className="mb-[250px] text-center">
            <h1 className="text-2xl font-bold">Welcome to {bot.name}</h1>
            <p>{bot.description}</p>
            <p>Version: {bot.version}</p>
            <p>Lastest Update: {new Date(bot.createdDate).toLocaleDateString()}</p>
          </div>

          {/* Hộp nhập liệu */}
          <div className="relative w-full max-w-3xl">
            <input
              className="w-full px-6 py-3 border rounded-full shadow-sm focus:outline-none"
              type="text"
              placeholder="Ask Gemini Vietnam"
            />
            {/* Icon microphone */}
            <button className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600">
              <SendHorizontal />
            </button>
          </div>

          {/* Thông tin bên dưới hộp nhập liệu */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Gemini may display inaccurate info, including about people, so double-check its responses.{' '}
            <a href="#" className="text-blue-500 underline hover:text-blue-600">
              Your privacy & Gemini Apps
            </a>
          </p>
        </>
      ) : (
        // Giao diện loading
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
