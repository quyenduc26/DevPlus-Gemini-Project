import { GoogleGenerativeAI } from "@google/generative-ai";

// AI Service
const useAIService = () => {
  const botErrorMessage = "Something went wrong !!";
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
      throw new Error(
        error instanceof Error ? error.message : botErrorMessage
      );
    }
  };

  return { handleAIResponse };
};

export default useAIService;