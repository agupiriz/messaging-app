import { createSlice } from "@reduxjs/toolkit";

import { chatReducers } from "./chat.reducer";
import { ChatsSlice } from "./chat.types";

const initialState: ChatsSlice = {};

export const chatsSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: chatReducers,
});

export const {
  setChatEvents,
  setChatPagination,
  setMessageInput,
  setAddEvent,
  setAddEvents,
} = chatsSlice.actions;
