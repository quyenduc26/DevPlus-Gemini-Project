'use client'

import { useEffect, useState, useRef } from 'react'
import { BotInfoType } from '@/types'
import { ChatMessages } from '@/components/chat-list'
import { ChatInput } from '@/components/chat'
import { useAIService, useBotService } from './hooks'
import ToastManager from '@/components/ui/ToastManager'
import { userRole, botRole } from '@/constants'

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<
    { role: typeof userRole | typeof botRole; content: string }[]
  >([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const { handleAIResponse } = useAIService()
  const { fetchBotInfo } = useBotService()

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Event Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    setChatHistory(prev => [...prev, { role: 'user', content: inputMessage }])

    try {
      const aiResponse = await handleAIResponse(inputMessage, chatHistory)
      setChatHistory(prev => [...prev, { role: botRole, content: aiResponse }])
    } catch (error) {
      setToastMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      )
      setToastOpen(true)
    }
    setInputMessage('')
  }

  useEffect(() => {
    const initBot = async () => {
      try {
        const botInfo = await fetchBotInfo()
        setBot(botInfo)
      } catch (error) {
        setToastMessage(
          error instanceof Error ? error.message : 'Something went wrong'
        )
        setToastOpen(true)
      }
    }
    initBot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  // Loading
  if (!bot) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    )
  }

  // Render
  return (
    <div className="flex h-[85vh] flex-col">
      {/* ChatMessages Component */}
      <ChatMessages bot={bot} messages={chatHistory} />
      {/* ChatInput Component */}
      <ChatInput
        input={inputMessage}
        setInput={setInputMessage}
        handleSubmit={handleSubmit}
      />
      <ToastManager
        message={toastMessage}
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  )
}
