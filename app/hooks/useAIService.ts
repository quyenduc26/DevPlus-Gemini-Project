import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-hot-toast";

// AI Service
const useAIService = () => {
  const botErrorMessage = "Sorry, I have some error. Please try again.";
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
      toast.error(
        error instanceof Error ? error.message : "Something went wrong !!"
      );
      return botErrorMessage;
    }
  };

  return { handleAIResponse };
};

export default useAIService;
