export interface Message {
  id: string;

  text: string;

  type: "text" | "image";

  username: string;

  timestamp: string;

  isAutoResponse: boolean;

  imageUrl?: string;

  imageName?: string;

  imageSize?: number;

  replyTo?: string;
}

export interface ChatPagination {
  offset: number;

  limit: number;

  totalMessages: number;

  hasMore: boolean;
}

export interface PaginatedMessages {
  elements: Message[];

  pagination: ChatPagination;
}

export interface SendMessageResponse {
  data: Message;
}
