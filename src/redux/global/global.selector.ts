import { RootState } from "../store";

export const getToken = (state: RootState) => state.globalStatus.token;

export const getGlobalError = (state: RootState) => state.globalStatus.error;
