import { Redirect } from "expo-router";
import Chat from "../features/Chat/Chat";
import { getToken } from "../redux/global/global.selector";
import { useAppSelector } from "../redux/hooks";

export default function ChatScreen() {
  const token = useAppSelector(getToken);

  if (!token) {
    return <Redirect href="/login" />;
  }

  return <Chat />;
}
