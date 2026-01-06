import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedView } from "../components/ThemedView/ThemedView";
import { Color } from "../constants/colors";
import Chat from "../features/Chat/Chat";
import Login from "../features/Login/Login";
import { setToken } from "../redux/global";
import { getToken } from "../redux/global/global.selector";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getStoredToken } from "../utils/tokenStorage";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadToken = async () => {
      const storedToken = await getStoredToken();

      if (storedToken && isMounted) {
        dispatch(setToken(storedToken));
      }

      if (isMounted) {
        setIsHydrating(false);
      }
    };

    loadToken();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isHydrating) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.PRIMARY_500} />
      </ThemedView>
    );
  }

  return token ? <Chat /> : <Login />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
