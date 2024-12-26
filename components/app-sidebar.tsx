'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

import { ChevronUp } from 'lucide-react'
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
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ChatSectionType, UserType } from "@/types";
import ChatHistory from "@/components/chatHistory";
import Image from "next/image";
import { Button } from '@/components/ui/button'
import { useSectionService, useUserService } from '@/app/hooks'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function AppSidebar() {
  const { data: session } = useSession();
  const [allSections, setALlSections] = useState<ChatSectionType[] | null>(null);
  const [chatSection, setChatSection] = useState<ChatSectionType | null>(null);
  const [users, setUsers] = useState<UserType[] | []>([]);

  const { fetchSectionData, createNewChatSection } = useSectionService();
  const { fetchUserData } = useUserService();

  const fetchData = async () => {
    if (!session?.user?.email) return;

    const userEmail = session.user.email;
    console.log(userEmail);

    try {
      const userData = await fetchUserData();
      setUsers(userData);
      const { data: users } = await axios.get<UserType[]>(`${API_BASE_URL}/users`);
      const existingUser = users.find((user) => user.email === userEmail);

      if (!existingUser) {
        await axios.post(`${API_BASE_URL}/users`, {
          name: session.user.name,
          email: userEmail,
        });
        return;
      }

      // Fetch chat sections
      const allChatSections = await fetchSectionData();
      const filteredSections = allChatSections.filter(section => section.userId == existingUser?.id)
      setALlSections(filteredSections?.reverse());
    } catch (error) {
      console.error("Error fetching user or chat data:", error);
    }
  }

  const createNewChat = async () => {
    const userId = users.find(user => user.email === session?.user?.email)?.id;
    if (userId) {
      const sectionInfo = await createNewChatSection("New chat", userId);
      setChatSection(sectionInfo);
    }
  }

  useEffect(() => {
    fetchData();
  }, [session, allSections, chatSection]);

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
          <SidebarGroupContent>
            <button
              className="w-full text-center bg-neutral-950 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform active:scale-95"
              onClick={createNewChat}
            >
              New Chat
            </button>

          </SidebarGroupContent>
          <SidebarGroupLabel>Chat history</SidebarGroupLabel>
          <SidebarGroupContent>
            <ChatHistory data={allSections} />
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
                      src={session?.user?.image || '/avatar-default.png'}
                      alt="User Avatar"
                      className="rounded-full object-cover object-center bg-gray-200"
                      width={28}
                      height={28}
                      priority
                    />
                    {session?.user?.name || "Guest"}
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {session?.user && (
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
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
  )
}
