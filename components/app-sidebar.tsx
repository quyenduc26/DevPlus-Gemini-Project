"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { ChevronUp } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
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
import ChatHistory from "@/components/chatHistory";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function AppSidebar() {
  const { data: session } = useSession(); // Lấy session từ NextAuth
  const [chat, setChat] = useState<ChatHistoryType[] | null>(null);

  const fetchData = async () => {
    try {
      const chatHistoryRes = await axios.get<ChatHistoryType[]>(
        API_BASE_URL + "/chatHistory"
      );
      setChat(chatHistoryRes.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link className="w-full" href="/">
                <span>Chat Gemini</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chat history</SidebarGroupLabel>
          <SidebarGroupContent>
            <ChatHistory data={chat} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <Image
                      src={session?.user?.image || "/avatar-default.png"}
                      alt="User Avatar"
                      className="rounded-full object-cover object-center bg-gray-200"
                      width={28} 
                      height={28} 
                      priority
                    />
                    {session?.user?.name || "Guest"} {/* Sử dụng session */}
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {session?.user ? (
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                ) : (
                  ""
                )}
                <DropdownMenuItem>
                  <Link className="w-full" href="/settings">
                    <span>Setting</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {session?.user ? (
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left"
                    >
                      Sign out
                    </button>
                  ) : (
                    <Link className="w-full" href="/login">
                      <span>Sign in</span>
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
