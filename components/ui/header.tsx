'use client'

import * as React from 'react'
import Link from 'next/link'
import { CircleUserRound } from 'lucide-react'

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-white shadow-md">
            {/* Logo Gemini */}
            <div className="text-xl font-semibold text-zinc-900">
                <Link href="/" aria-label="Home">
                    Gemini
                </Link>
            </div>

            {/* User Icon */}
            <div className="flex items-center">
                <Link href="/profile" aria-label="User Profile">
                    <CircleUserRound className="size-6 text-zinc-600 hover:text-zinc-900 cursor-pointer" />
                </Link>
            </div>
        </header>
    )
}
