"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
  return (
    <footer className="p-2 from-gray-50 to-gray-100">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Gemini Vietnam..."
          className="pr-12 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-blue-200 transition-all"
        />

        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-full"
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4 text-white" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
      <p className="text-xs text-center text-muted-foreground mt-3 italic">
        AI may display inaccurate info. Please verify important information.
      </p>
    </footer>
  );
}
