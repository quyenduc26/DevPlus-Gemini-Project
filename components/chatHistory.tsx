import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChatHistoryType } from '@/types';

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
                <span>{item.messages[0]?.content || 'No messages yet'}</span>
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
        ))
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </div>
      )}
    </SidebarMenu>
  );
}
