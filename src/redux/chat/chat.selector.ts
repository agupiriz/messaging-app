import { Message } from "../../api/domain/chat/chat.types";
import { RootState } from "../store";

export const getChatEvents = (state: RootState) => state.chatStatus.chatEvents;

export const getChatEventIds = (state: RootState) =>
  state.chatStatus.messageIds;

export const getChatEventById = (id: string) => (state: RootState) =>
  state.chatStatus.chatEvents?.[id];

export const getChatEventPropertyById =
  <K extends keyof Message>(id: string, key: K) =>
  (state: RootState): Message[K] | undefined =>
    state.chatStatus.chatEvents?.[id]?.[key];

export const getChatPagination = (state: RootState) =>
  state.chatStatus.pagination;

export const getMessageInput = (state: RootState) =>
  state.chatStatus.messageInput;
