'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { BotInfoType } from "@/types";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
<<<<<<< HEAD
  return (
    <div className="p-8 w-screen ">
      <h1 className="text-2xl font-bold">Hello Team can I help you today</h1>
      <p>This is the home page content.</p>
=======
  const [bot, setBot] = useState<BotInfoType | null>(null);

  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + '/botInfo');
      setBot(response.data);
    } catch (error) {
      console.error("Error fetching bot info:", error);
    }
  };

  useEffect(() => {
    fetchBotInfo();
  }, []);

  return (
    <div>
      {bot ? (
        <>

          <div className="p-5">
            <h1 className="text-2xl font-bold">Welcome to {bot.name}</h1>
            <p>{bot.description}</p>
            <p>Version: {bot.version}</p>
            <p>Lastest Update: {bot.createdDate}</p>
          </div>
          <div className="flex p-5 items-center">
            <input className="w-full border rounded-md m-2 p-1" type="text" placeholder="Message Gemini Vietnam" />
            <Button variant="outline">Submit</Button>
          </div>
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
>>>>>>> 71b7da9787fa99b3e20849db126df3a11ade7c0c
    </div>
  );
}
