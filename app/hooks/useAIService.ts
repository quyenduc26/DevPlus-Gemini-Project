import axios from 'axios'
import { USER_ROLE, BOT_ROLE } from '@/constants'
// AI Service
const useAIService = () => {
  const errorMessage = 'Error in AI response'
  const handleAIResponse = async (
    userMessage: string,
    chatHistory: { role: typeof USER_ROLE | typeof BOT_ROLE; content: string }[]
  ) => {
    try {
      const response = await axios.post('/api/ai_service', {
        userMessage,
        chatHistory
      })
      if (response.status !== 200) {
        throw new Error(response.data.error || errorMessage)
      }
      return response.data.text
    } catch (error) {
      throw error
    }
  }

  return { handleAIResponse }
}

export default useAIService
