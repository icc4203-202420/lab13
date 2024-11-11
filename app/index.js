import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { saveItem } from "../util/storage"; // Importa el método para guardar datos

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (username) {
      await saveItem("username", username); // Usa el método condicional para guardar el usuario
      router.push("/pokemon"); // Navegar a la pantalla de pokemones
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label} testID="username-label">
        Enter your username:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        testID="username-input"
      />
      <Button title="Login" onPress={handleLogin} testID="login-button"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
