import { createSlice } from "@reduxjs/toolkit";
import { globalReducers } from "./global.reducer";
import { GlobalSlice } from "./global.types";

const initialState: GlobalSlice = {};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: globalReducers,
});

export const { setToken, setError, clearError } = globalSlice.actions;
