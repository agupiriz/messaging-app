import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import logoSource from "../../assets/images/logo_chatter_color_2.png";
import { Text } from "../../components/Text/Text";
import { ThemedView } from "../../components/ThemedView/ThemedView";
import { Color } from "../../constants/colors";
import { useLogin } from "../../hooks/useLogin";
import { setToken } from "../../redux/global";
import { useAppDispatch } from "../../redux/hooks";
import { setStoredToken } from "../../utils/tokenStorage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { mutate: login, isPending } = useLogin();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Ingresa usuario y contrasena.");
      return;
    }

    setErrorMessage(null);
    login(
      { username, password },
      {
        onSuccess: async (data) => {
          await setStoredToken(data.token);
          dispatch(setToken(data.token));
        },
        onError: (error) => {
          setErrorMessage(error.message || "No se pudo iniciar sesion.");
        },
      }
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <ThemedView style={styles.wrapper}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isPending}
          />
          <TextInput
            style={styles.input}
            placeholder="Contrasena"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isPending}
          />

          {errorMessage ? (
            <Text style={styles.errorText} lightColor="#FFD1D1">
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesion</Text>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_500,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  wrapper: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  logo: {
    width: "80%",
    maxHeight: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffffff99",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: Color.PRIMARY_300,
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "none",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
  },
});




