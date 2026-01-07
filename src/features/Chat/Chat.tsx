import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";

import { PaginatedMessages } from "../../api/domain/chat/chat.types";
import { ThemedView } from "../../components/ThemedView/ThemedView";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../constants/pagination";
import { useGetEvents } from "../../hooks/useGetEvents";
import { setChatEvents, setChatPagination } from "../../redux/chat";
import { useAppDispatch } from "../../redux/hooks";
import Body from "./Body/Body";
import Loading from "./Body/Loading";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Chat() {
  const { mutate: getEvents, isPending } = useGetEvents();

  const dispatch = useAppDispatch();

  const onSuccess = useCallback((data: PaginatedMessages) => {
    const { elements, pagination } = data;

    dispatch(setChatEvents(elements));
    dispatch(setChatPagination(pagination));
  }, [dispatch]);

  useEffect(() => {
    getEvents({ limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET }, { onSuccess });
  }, [getEvents, onSuccess]);

  return (
    <ThemedView style={styles.container}>
      <Header />

      {!isPending ? <Body /> : <Loading />}

      <Footer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
