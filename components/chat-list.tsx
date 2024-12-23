'use client'

import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type ChatMessagesProps = {
  bot: { name: string; description: string; version: string; createdDate: string };
  messages: { role: 'user' | 'assistant'; content: string }[];
};

export function ChatMessages({ bot, messages }: ChatMessagesProps) {
  return (
    <main className="flex-1 overflow-auto p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
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
                'flex items-start gap-3 p-4 rounded-lg',
                message.role === 'assistant'
                  ? 'bg-muted flex-row' // AI: on the left 
                  : 'bg-blue-100 flex-row-reverse' // User: on the right 
              )}
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground">
                {message.role === 'assistant' ? <Bot className="h-5 w-5 bg-primary rounded-full h-8 w-8" /> :
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/avatar-default.png"}
                      alt="User Avatar"
                      className="rounded-full object-cover object-center bg-gray-200"
                      width={32}
                      height={32}
                      priority
                    />

                  </div>}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1 text-sm text-gray-800">
                  {message.role === 'assistant' ? 'Chat Gemini' : ''}
                </p>
                <ReactMarkdown className="text-sm text-gray-600">
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
