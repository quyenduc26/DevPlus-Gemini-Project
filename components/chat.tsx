'use client'

import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type ChatInputProps = {
  input: string
  setInput: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
}

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  isLoading = false
}: ChatInputProps) {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
    setInput('')
  }

  return (
    <footer className="from-gray-50 to-gray-100 p-2">
      <form onSubmit={onSubmit} className="relative mx-auto max-w-3xl">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Message Gemini Vietnam..."
          className="rounded-full border-2 border-gray-200 pr-12 transition-all focus:ring-2 focus:ring-blue-200"
        />

        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4 text-white" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
      <p className="mt-3 text-center text-xs italic text-muted-foreground">
        AI may display inaccurate info. Please verify important information.
      </p>
    </footer>
  )
}
