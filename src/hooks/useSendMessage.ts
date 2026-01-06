import { useCallback } from "react";

import ChatService from "../api/domain/chat/chat.service";
import useQuery from "./useQuery";

const chatService = new ChatService();

export const useSendTextMessage = () => {
  const get = useCallback(async (text: string) => {
    return chatService.sendTextMessage(text);
  }, []);

  return useQuery({ fetchFn: get });
};

export const useSendImageMessage = () => {
  const get = useCallback(async (formData: FormData) => {
    return chatService.sendImageMessage(formData);
  }, []);

  return useQuery({ fetchFn: get });
};
