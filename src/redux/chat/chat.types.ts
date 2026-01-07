import { ChatPagination, Message } from "../../api/domain/chat/chat.types";

export interface ChatsSlice {
  chatEvents?: Record<string, Message>;

  messageIds?: string[];

  pagination?: ChatPagination;

  messageInput?: string;
}
