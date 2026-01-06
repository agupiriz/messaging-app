import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/Text/Text";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { Color } from "../../../constants/colors";
import { resetStore } from "../../../redux/store";
import { useAppDispatch } from "../../../redux/hooks";
import { clearStoredToken } from "../../../utils/tokenStorage";
import Avatar from "./Avatar";
import Data from "./Data";

function Header() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await clearStoredToken();
    dispatch(resetStore());
  };

  return (
    <ThemedView
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 8, height: 80 + insets.top },
      ]}
    >
      <Avatar />

      <Data />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text type="defaultSemiBold" lightColor="#FFF">
          Cerrar sesion
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

export default React.memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
    backgroundColor: Color.PRIMARY_500,
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Color.PRIMARY_300,
  },
});
