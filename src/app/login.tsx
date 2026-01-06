import { Redirect } from "expo-router";
import Login from "../features/Login/Login";
import { getToken } from "../redux/global/global.selector";
import { useAppSelector } from "../redux/hooks";

export default function LoginScreen() {
  const token = useAppSelector(getToken);

  if (token) {
    return <Redirect href="/chat" />;
  }

  return <Login />;
}
