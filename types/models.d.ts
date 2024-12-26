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
  
  
  export type MessageType = {
    id?: string;
    author: 0 | 1; 
    content: string;
    timeStamp: number;
  };

  export type ChatMessageType = {
    id?: string;
    sectionId: string;
    role: 'user' | 'assistant';
    content: string;
    timeStamp?: number;
  };

  export type ChatSectionType = {
    id: string;
    userId: string;
    title: string;
    status: 0 | 1;
    timeStamp: number;
  };
  
