import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ChatSectionType } from "@/types";
import LoadingSpinner from "@/components/spinner";
import { useSearchParams } from 'next/navigation';

interface ChatHistoryProps {
  data?: ChatSectionType[] | null;
}

export default function ChatHistory({ data }: ChatHistoryProps) {
  const chatId = useSearchParams().get("id");

  return (
    <SidebarMenu>
      {data ? (
        data.map((item, index) => {
          const isActive = chatId === item.id; 
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link
                  href={"/chat?id=" + item.id}
                  className={isActive ? "font-bold bg-zinc-200" : "text-gray-700"}
                >
                  <span>{item.title || "New chat"}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </SidebarMenu>
  )
}
