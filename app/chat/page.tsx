'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { BotInfoType } from '@/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

export default function HomePage() {
  const [bot, setBot] = useState<BotInfoType | null>(null)

  const fetchBotInfo = async () => {
    try {
      const botInfoRes = await axios.get<BotInfoType>(API_BASE_URL)
      setBot(botInfoRes.data)
      setBot(botInfoRes.data)
    } catch (error) {
      console.error('Error fetching bot info:', error)
    }
  }

  useEffect(() => {
    fetchBotInfo()
  }, [])

  return (
    <div className="p-8">
      {bot ? (
        <>
          <h1 className="text-2xl font-bold">Welcome to {bot.name}</h1>
          <p>{bot.description}</p>
          <p>Version: {bot.version}</p>
          <p>Lastest Update: {bot.createdDate}</p>
        </>
      ) : (
        <p>Loading bot information...</p>
      )}
    </div>
  )
}
