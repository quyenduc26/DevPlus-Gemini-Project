'use client'

import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { USER_ROLE, BOT_ROLE } from '@/constants'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/github.css'

type ChatMessagesProps = {
  bot: {
    name: string
    description: string
    version: string
    createdDate: string
  }
  messages: { role: typeof USER_ROLE | typeof BOT_ROLE; content: string }[]
}
export function ChatMessages({ bot, messages }: ChatMessagesProps) {
  return (
    <main className="flex-1 overflow-auto p-4">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.length === 0 ? (
          <div className="py-20 text-center">
            <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Welcome to {bot.name}</h1>
            <p>{bot.description}</p>
            <p>Version: {bot.version}</p>
            <p>Latest Update: {bot.createdDate}</p>
          </div>
        ) : (
          messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-3 rounded-lg p-4',
                message.role === BOT_ROLE
                  ? 'flex-row bg-muted' // AI: on the left
                  : 'flex-row-reverse bg-blue-100' // User: on the right
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground">
                {message.role === BOT_ROLE ? (
                  <Bot className="h-8 w-8 rounded-full bg-primary" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={'/avatar-default.png'}
                      alt="User Avatar"
                      className="rounded-full bg-gray-200 object-cover object-center"
                      width={32}
                      height={32}
                      priority
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="mb-1 text-sm font-medium text-gray-800">
                  {message.role === BOT_ROLE ? 'Chat Gemini' : ''}
                </p>
                <ReactMarkdown
                  className="prose max-w-none text-black"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
