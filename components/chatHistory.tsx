import React from 'react';
import { Calendar, Home, Inbox, MoreHorizontal, Search, Settings } from "lucide-react";
import Link from 'next/link';
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
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="mb-2 text-gray-600">No chat history found.</p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => console.log('Create New Chat')}
                    >
                        Create New Chat
                    </button>
                </div>
            )}
        </SidebarMenu>
    );
}
