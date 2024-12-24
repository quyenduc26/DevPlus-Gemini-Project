'use client';

import * as React from 'react';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md">
      {/* Logo Gemini */}
      <div className="text-xl font-semibold text-zinc-900">
        <Link href="/" aria-label="Home">
          Gemini
        </Link>
      </div>

      {/* User Icon */}
      <div className="flex items-center">
        <Link href="/profile" aria-label="User Profile">
          <CircleUserRound className="size-6 cursor-pointer text-zinc-600 hover:text-zinc-900" />
        </Link>
      </div>
    </header>
  );
}
