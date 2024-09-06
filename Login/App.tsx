import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as Font from "expo-font";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";

export default function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // a fonte do Google
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  // useEffect para mostrar mensagem
  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  // Mensagem dos crias
  const handleLogin = () => {
    alert(`Usuário: ${user}, Senha: ${password}`);
    setIsLoggedIn(true);
  };

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <Container>
      {!isLoggedIn && <AlertText>Usuário não está logado</AlertText>}

      <Title>Login</Title>

      <Input
        placeholder="Usuário"
        value={user}
        onChangeText={setUser}
        placeholderTextColor="#888"
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
        secureTextEntry
      />

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

// css
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.Text`
  font-size: 32px;
  font-family: "Inter_400Regular";
  margin-bottom: 40px;
`;

const Input = styled.TextInput`
  width: 25%;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  width: 25%;
  padding: 15px;
  background-color: #007bff;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "Inter_400Regular";
`;

const AlertText = styled.Text`
  font-size: 16px;
  color: red;
  margin-bottom: 20px;
  font-family: "Inter_400Regular";
`;
