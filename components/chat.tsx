'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
  return (
    <footer className="border-t p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Gemini Vietnam"
          className="pr-12 border-none focus:ring-0"
        />

        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
      <p className="text-xs text-center text-muted-foreground mt-2">
        AI may display inaccurate info. Please verify important information.
      </p>
    </footer>
  );
}
