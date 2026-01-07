import { PayloadAction } from "@reduxjs/toolkit";

import { ChatPagination, Message } from "../../api/domain/chat/chat.types";
import { ChatsSlice } from "./chat.types";

export const chatReducers = {
  setChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>
  ) => {
    if (action.payload) {
      state.chatEvents = action.payload.reduce((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {} as Record<string, Message>);
    } else {
      state.chatEvents = undefined;
    }
  },

  setChatPagination: (
    state: ChatsSlice,
    action: PayloadAction<ChatPagination | undefined>
  ) => {
    state.pagination = action.payload;
  },

  setAddEvents: (state: ChatsSlice, action: PayloadAction<Message[]>) => {
    if (!action.payload?.length) {
      return;
    }

    if (!state.chatEvents) {
      state.chatEvents = {};
    }

    action.payload.forEach((message) => {
      state.chatEvents![message.id] = message;
    });
  },

  setMessageInput: (
    state: ChatsSlice,
    action: PayloadAction<string | undefined>
  ) => {
    state.messageInput = action.payload;
  },

  setAddEvent: (state: ChatsSlice, action: PayloadAction<Message>) => {
    if (state.chatEvents) {
      state.chatEvents[action.payload.id] = action.payload;
    } else {
      state.chatEvents = { [action.payload.id]: action.payload };
    }
  },
};
