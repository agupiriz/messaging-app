import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../../global.css";
import { HttpStatusCode } from "../api/baseRepositories/api/http/constants";
import { BaseError } from "../api/errors/BaseError";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";
import { useColorScheme } from "../hooks/useColorSchemeWeb";
import { setError } from "../redux/global";
import { resetStore, store } from "../redux/store";
import { clearStoredToken } from "../utils/tokenStorage";
import SocketProvider from "./socketProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const clearStorage = async () => {
    await clearStoredToken();
    store.dispatch(resetStore());
  };

  const defaultOnError = (error: BaseError) => {
    if (error) {
      const { status } = error;
      if (status === HttpStatusCode.UNAUTHORIZED) {
        return clearStorage();
      }

      store.dispatch(setError(error.message || "Error inesperado"));

      // NOTE: Handle other global errors here, f.e.g. show a toast notification
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
      },
      mutations: {
        onError: (e) => {
          defaultOnError(e as BaseError);
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ActionSheetProvider>
            <SocketProvider>
              <GestureHandlerRootView>
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen name="chat" options={{ headerShown: false }} />
                </Stack>

                <StatusBar style="light" />
                <ErrorBanner />
              </GestureHandlerRootView>
            </SocketProvider>
          </ActionSheetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
