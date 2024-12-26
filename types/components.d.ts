export type chatHistoryItem = {
  title: String;
  url: string | URL;
};

export type ChatHistoryProps = {
    chatHistory: chatHistoryItem[]; 
}
  
export interface UserInfo{
    id:string;
    name:string | null;
    email:string | null;
    image:string |null
}

export interface ProfileFormProps {
  userInfor: UserInfo;
}
