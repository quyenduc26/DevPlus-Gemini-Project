import axios from "axios";
import { ChatMessageType, MessageType } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Message Service
const useMessageService = () => {
  const userErrorMessage = "Fail to fetch user data!";
  const fetchMessage = async (id: string) => {
    try {
      const response = await axios.get<ChatMessageType[]>(API_BASE_URL + "/chatMessages");
      const messages = response.data.filter( item => item.sectionId == id);
      return messages;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : userErrorMessage);
    }
  };

  return { fetchMessage };
};

export default useMessageService;
