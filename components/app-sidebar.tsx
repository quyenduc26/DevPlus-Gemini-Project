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
              <Link href="/">
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
                  {session?.user?.name || "Username"} {/* Sử dụng session */}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href="/profile">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">
                    <span>Setting</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {session?.user ? (
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left"
                    >
                      <span>Sign out</span>
                    </button>
                  ) : (
                    <Link href="/login">
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
