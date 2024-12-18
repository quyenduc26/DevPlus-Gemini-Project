export type BotInfoType = {
    id: string; 
    name: string;
    description: string;
    version: string;
    createdDate: string;
  };
  
  export type UserType = {
    id?: string;
    name: string;
    email: string;
  };
  
  export type ChatHistoryType = {
    id: string;
    userId: string;
    title: string;
    messages: Message[];
  };
  
  export type MessageType = {
    id?: number;
    author: 0 | 1; 
    content: string;
    timeStamp: string;
  };
  