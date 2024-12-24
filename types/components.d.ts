export type chatHistoryItem = {
  title: String;
  url: string | URL;
};

export type ChatHistoryProps = {
  chatHistory: chatHistoryItem[];
};
