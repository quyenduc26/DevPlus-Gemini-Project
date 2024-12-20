"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BotInfoType } from "@/types";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);

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
  const handleSubmit = async () => {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai"); // Dynamically import
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

      setAIResponse(result.response.text());
    } catch (error) {
      console.error("Error interacting with Gemini AI:", error);
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
          <div className="flex flex-col p-5 items-center">
            <input
              className="w-full border rounded-md m-2 p-1"
              type="text"
              placeholder="Message Gemini Vietnam"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)} // Handle input change
            />
            <Button variant="outline" onClick={handleSubmit}>
              Submit
            </Button>{" "}
            {/* Submit button */}
            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-100 border rounded-md">
                <h2 className="text-lg font-semibold">AI Response:</h2>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
