import React from 'react'
import { Calendar, Home, Inbox, MoreHorizontal, Search, Settings } from "lucide-react"
import Link from 'next/link'
import { Header } from "@/components/ui/header"

import {
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { chatHistoryItem, ChatHistoryProps } from "@/types/index"

const items: chatHistoryItem[] = [
    {
        title: "Chat 1",
        url: "/chat",
    },
    {
        title: "Inbox",
        url: "#",
    },
    {
        title: "Calendar",
        url: "#",
    },
    {
        title: "Search",
        url: "#",
    },
    // {
    //     title: "Settings",
    //     url: "#",
    // },
]




export default function ChatHistory() {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={item.url}>
                            <span>{item.title}</span>
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
            ))}
        </SidebarMenu>
    )
}
