import React from "react";
import { StyleSheet } from "react-native";

import { Text } from "../../../components/Text/Text";
import { ThemedView } from "../../../components/ThemedView/ThemedView";

function Data() {
  return (
    <ThemedView style={styles.dataContainer}>
      <Text type="subtitle" lightColor="#FFF">
        Agustin Levin
      </Text>

      <Text type="defaultItalic" lightColor="#FFF">
        Ult vez. hoy 18:59 hs.
      </Text>
    </ThemedView>
  );
}

export default React.memo(Data);

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
    flex: 1,
    backgroundColor: "transparent",
  },
});
