import axios from "axios";
import { BotInfoType } from "@/types";
import { toast } from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Bot Service
const useBotService = () => {
  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + "/botInfo");
      return response.data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong !!"
      );
      return null;
    }
  };

  return { fetchBotInfo };
};

export default useBotService;
