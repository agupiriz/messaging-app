import { PayloadAction } from "@reduxjs/toolkit";

import { ChatPagination, Message } from "../../api/domain/chat/chat.types";
import { ChatsSlice } from "./chat.types";

export const chatReducers = {
  setChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>
  ) => {
    if (action.payload) {
      const sorted = [...action.payload].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      state.chatEvents = sorted.reduce((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {} as Record<string, Message>);
      state.messageIds = sorted.map((message) => message.id);
    } else {
      state.chatEvents = undefined;
      state.messageIds = undefined;
    }
  },

  setChatPagination: (
    state: ChatsSlice,
    action: PayloadAction<ChatPagination | undefined>
  ) => {
    state.pagination = action.payload;
  },

  setMessageInput: (
    state: ChatsSlice,
    action: PayloadAction<string | undefined>
  ) => {
    state.messageInput = action.payload;
  },

  setAddEvent: (state: ChatsSlice, action: PayloadAction<Message>) => {
    if (!state.chatEvents) {
      state.chatEvents = {};
    }

    const exists = !!state.chatEvents[action.payload.id];
    state.chatEvents[action.payload.id] = action.payload;

    if (!state.messageIds) {
      state.messageIds = [];
    }

    if (!exists) {
      state.messageIds.unshift(action.payload.id);
    }
  },

  setAddEvents: (state: ChatsSlice, action: PayloadAction<Message[]>) => {
    if (!action.payload?.length) {
      return;
    }

    if (!state.chatEvents) {
      state.chatEvents = {};
    }

    if (!state.messageIds) {
      state.messageIds = [];
    }

    const batch = [...action.payload].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    batch.forEach((message) => {
      const exists = !!state.chatEvents![message.id];
      state.chatEvents![message.id] = message;
      if (!exists) {
        state.messageIds!.push(message.id);
      }
    });
  },
};
