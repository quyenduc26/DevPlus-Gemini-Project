'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { BotInfoType } from "@/types";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
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
        <p>Loading bot information...</p>
      )}
    </div>
  );
}
