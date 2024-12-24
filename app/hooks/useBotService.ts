import axios from 'axios';
import { BotInfoType } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Bot Service
const useBotService = () => {
  const botErrorMessage = 'Something went wrong !!';
  const fetchBotInfo = async () => {
    try {
      const response = await axios.get<BotInfoType>(API_BASE_URL + '/botInfo');
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : botErrorMessage);
    }
  };

  return { fetchBotInfo };
};

export default useBotService;
