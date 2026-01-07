import React, { useCallback, useMemo } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import {
  PaginatedMessages
} from "../../../api/domain/chat/chat.types";
import { DEFAULT_LIMIT } from "../../../constants/pagination";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { setAddEvents, setChatPagination } from "../../../redux/chat";
import { getChatEvents, getChatPagination } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LoadingMore from "./LoadingMore";
import MessageItem from "./Message/Message";

function Body() {
  const events = useAppSelector(getChatEvents);
  const pagination = useAppSelector(getChatPagination);
  const dispatch = useAppDispatch();
  const { mutate: getEvents, isPending: isLoadingMore } = useGetEvents();

  const data = useMemo(() => {
    return Object.values(events || {}).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [events]);

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
        data={data}
        renderItem={({ item }) => <MessageItem key={item.id} id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
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
