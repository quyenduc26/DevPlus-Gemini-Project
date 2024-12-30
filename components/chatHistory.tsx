import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { ChatSectionType } from "@/types";
import LoadingSpinner from "@/components/spinner";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface ChatHistoryProps {
  data?: ChatSectionType[] | null;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function ChatHistory({ data }: ChatHistoryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatId = useSearchParams().get("id");

  const handleDeleteClick = (id: string) => {
    setSelectedChatId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedChatId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedChatId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/chatMessages`);
        const messages = response.data;
  
        const messagesToDelete = messages.filter((message: any) => message.sectionId === selectedChatId);
  
        for (const message of messagesToDelete) {
          await axios.delete(`${API_BASE_URL}/chatMessages/${message.id}`);
        }
  
        await axios.delete(`${API_BASE_URL}/chatSections/${selectedChatId}`);
        setIsDeleted(true);
        setIsModalOpen(false);
        setSelectedChatId(null);
      } catch (err) {
        setError(`Failed to delete chat. Please try again later.`);
      }
    }
  };

  useEffect(() => {
    if (isDeleted) {
      window.location.reload();
    }
  },[isDeleted])
  

  return (
    <>
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
                    <DropdownMenuItem onClick={() => handleDeleteClick(item.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </SidebarMenu>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Delete chat?</h2>
            <p className="text-sm text-gray-600 mb-6">
            This action will delete the chat and cannot be undone.
             </p>
            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
