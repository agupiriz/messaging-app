import React from "react";
import { Image, StyleSheet } from "react-native";
import { config } from "../../../../../api/config";
import { Text } from "../../../../../components/Text/Text";
import { getChatEventPropertyById } from "../../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../../redux/hooks";
import { getMessageTextColor } from "../../../../../utils/getMessageTextColor";
import { useMessageContext } from "../Provider";

function ImageLayout() {
  const ctx = useMessageContext();

  const imageUrl = useAppSelector(
    getChatEventPropertyById(ctx.id, "imageUrl")
  );
  const caption = useAppSelector(getChatEventPropertyById(ctx.id, "text"));
  const isAutoResponse = useAppSelector(
    getChatEventPropertyById(ctx.id, "isAutoResponse")
  );

  const isReceived = !!isAutoResponse;
  const color = getMessageTextColor(isReceived);

  if (!imageUrl) {
    return null;
  }

  const resolvedUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${config.socketUrl}${imageUrl}`;

  return (
    <>
      <Image source={{ uri: resolvedUrl }} style={styles.image} />
      {caption ? (
        <Text type="default" lightColor={color} style={styles.caption}>
          {caption}
        </Text>
      ) : null}
    </>
  );
}

export default React.memo(ImageLayout);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 160,
    borderRadius: 8,
  },
  caption: {
    marginTop: 6,
  },
});
