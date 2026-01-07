import React, { useCallback } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import { PaginatedMessages } from "../../../api/domain/chat/chat.types";
import { DEFAULT_LIMIT } from "../../../constants/pagination";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { setAddEvents, setChatPagination } from "../../../redux/chat";
import {
  getChatEventIds,
  getChatPagination,
} from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LoadingMore from "./LoadingMore";
import MessageItem from "./Message/Message";

function Body() {
  const messageIds = useAppSelector(getChatEventIds);
  const pagination = useAppSelector(getChatPagination);
  const dispatch = useAppDispatch();
  const { mutate: getEvents, isPending: isLoadingMore } = useGetEvents();

  const handleLoadMoreSuccess = useCallback(
    (response: PaginatedMessages) => {
      dispatch(setAddEvents(response.elements));
      dispatch(setChatPagination(response.pagination));
    },
    [dispatch]
  );

  const handleLoadMore = useCallback(() => {
    if (!pagination?.hasMore || isLoadingMore || !pagination.limit) {
      return;
    }

    const nextOffset = pagination.offset + pagination.limit;

    getEvents(
      { limit: pagination.limit ?? DEFAULT_LIMIT, offset: nextOffset },
      { onSuccess: handleLoadMoreSuccess }
    );
  }, [getEvents, handleLoadMoreSuccess, isLoadingMore, pagination]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => <MessageItem id={item} />,
    []
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={styles.bodyContainer}
      resizeMode="repeat"
    >
      {isLoadingMore ? (
        <View style={styles.loadingOverlay}>
          <LoadingMore />
        </View>
      ) : null}

      <FlatList
        data={messageIds ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        inverted
        overScrollMode="never"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
    </ImageBackground>
  );
}

export default React.memo(Body);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  loadingOverlay: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
