import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Text } from "../../../components/Text/Text";
import { Color } from "../../../constants/colors";

function LoadingMore() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Color.PRIMARY_500} />
      <Text type="small" lightColor="#333">
        Cargando mas...
      </Text>
    </View>
  );
}

export default React.memo(LoadingMore);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
});
