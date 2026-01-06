import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth.token";

let cachedToken: string | null | undefined;

export const getStoredToken = async () => {
  if (cachedToken !== undefined) {
    return cachedToken;
  }

  const token = await AsyncStorage.getItem(TOKEN_KEY);
  cachedToken = token;

  return token;
};

export const setStoredToken = async (token: string) => {
  cachedToken = token;
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = async () => {
  cachedToken = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
};
