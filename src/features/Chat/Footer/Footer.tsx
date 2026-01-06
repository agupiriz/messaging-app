import React, { useCallback } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AttachmentButton from "./Attachment";
import Send from "./Send";

function Footer() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const message = useAppSelector(getMessageInput);

  const onChangeText = useCallback(
    (text: string) => {
      dispatch(setMessageInput(text));
    },
    [dispatch]
  );

  return (
    <ThemedView
      style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
    >
      <AttachmentButton />

      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={onChangeText}
        placeholder="Escribe un mensaje..."
        multiline
        numberOfLines={4}
        maxLength={1000}
        textAlignVertical="top"
        scrollEnabled
      />

      <Send />
    </ThemedView>
  );
}

export default React.memo(Footer);

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 1,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 70,
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: "#fff",
    minHeight: 44,
    maxHeight: 110,
    textAlignVertical: "top",
  },
});
