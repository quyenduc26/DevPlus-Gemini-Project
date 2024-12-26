import axios from 'axios'
import { userRole, botRole } from '@/constants'
// AI Service
const useAIService = () => {
  const errorMessage = 'Error in AI response'
  const handleAIResponse = async (
    userMessage: string,
    chatHistory: { role: typeof userRole | typeof botRole; content: string }[]
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
