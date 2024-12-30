import axios from "axios";
import { ChatSectionType, UserType } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// New Chat Section
const useSectionService = () => {
    const userErrorMessage = "Fail to fetch user data!";

    const fetchSectionData = async () => {
        try {
          const response = await axios.get<ChatSectionType[]>(API_BASE_URL + "/chatSections");
          return response.data;
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : userErrorMessage);
        }
      };

    const createNewChatSection = async (title: string, userId: string) => {
        try {
            await axios.post<ChatSectionType[]>(API_BASE_URL + "/chatSections", {
                title: title,
                status: 0,
                timestamp: Date.now(),
                userId: userId
            });
            const sections = await fetchSectionData();
            return sections[sections.length - 1];
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : userErrorMessage);
        }
    };

    const updateSectionTitle = async (sectionId: string, newTitle: string) => {
      try {
        const updateResponse = await axios.patch(`${API_BASE_URL}/chatSections/${sectionId}`, {
          title: newTitle
        });
      } catch (error) {
        console.error("Error updating section title:", error instanceof Error ? error.message : error);
      }
    };

    return { fetchSectionData, createNewChatSection, updateSectionTitle };
};

export default useSectionService;
