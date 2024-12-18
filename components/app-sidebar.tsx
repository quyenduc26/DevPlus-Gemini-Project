import { Calendar, Home, Inbox, Search, Settings, Blocks, Link2, SunMoon, ListMinus, CirclePlus } from "lucide-react"
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import ChatHistory from "@/components/chatHistory"


// Menu items.
const items = [
    {
        title: "Chat 1",
        url: "/chat",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: <Settings />,
    // },
]

export function AppSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Link href="/">

                                    <span>Chat Gemini</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel> <CirclePlus /><p> New chat</p></SidebarGroupLabel>
                        <SidebarGroupContent>
                            <p>Recently</p>
                            <ChatHistory />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <Settings /> Setting
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <Blocks /> Extensions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link2 />Your public link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <SunMoon />Dark Mode
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ListMinus />Real-time responses
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}
