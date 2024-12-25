import axios from "axios";
import { UserType } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// User Service
const useUserService = () => {
  const userErrorMessage = "Fail to fetch user data!";
  const fetchUserData = async () => {
    try {
      const response = await axios.get<UserType[]>(API_BASE_URL + "/users");
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : userErrorMessage);
    }
  };

  return { fetchUserData };
};

export default useUserService;
