import axios from "axios";
import { ChatMessageType, MessageType } from "@/types";
import { BOT_ROLE, USER_ROLE } from "@/constants";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Message Service
const useMessageService = () => {
  const userErrorMessage = "Fail to fetch user data!";
  const fetchMessage = async (id: string): Promise<{
    role: typeof USER_ROLE | typeof BOT_ROLE;
    content: string;
  }[]> => {
    try {
      const response = await axios.get<ChatMessageType[]>(API_BASE_URL + "/chatMessages");
      const messageResponses = response.data.filter(item => item.sectionId == id);
      const messages = messageResponses.map(item => item.role == "assistant" ? { role: "model" as typeof BOT_ROLE, content: item.content } : { role: "user" as typeof USER_ROLE, content: item.content })
      return messages;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : userErrorMessage);
    }
  };

  return { fetchMessage };
};

export default useMessageService;
