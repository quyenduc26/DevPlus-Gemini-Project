<<<<<<< HEAD
import React from 'react'
import { Calendar, Home, Inbox, MoreHorizontal, Search, Settings } from "lucide-react"
import Link from 'next/link'
import { Header } from "@/components/ui/header"

=======
import React from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
>>>>>>> 71b7da9787fa99b3e20849db126df3a11ade7c0c
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChatHistoryType } from "@/types";

interface ChatHistoryProps {
  data: ChatHistoryType[] | null;
}

export default function ChatHistory({ data }: ChatHistoryProps) {
  return (
    <SidebarMenu>
      {data ? (
        data.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Link href={item.id}>
                <span>{item.messages[0]?.content || "No messages yet"}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </SidebarMenu>
  );
}
