import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Color } from "../../constants/colors";
import { clearError } from "../../redux/global";
import { getGlobalError } from "../../redux/global/global.selector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";

const AUTO_HIDE_MS = 3500;

function ErrorBanner() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(getGlobalError);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(clearError());
    }, AUTO_HIDE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, message]);

  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.banner}>
        <Text lightColor="#fff" style={styles.message}>
          {message}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => dispatch(clearError())}
        >
          <Icon name="xmark" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(ErrorBanner);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  banner: {
    width: "100%",
    backgroundColor: Color.ERROR,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  message: {
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
