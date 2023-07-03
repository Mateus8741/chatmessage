import {
    Box,
    Button,
    FormControl,
    HStack,
    Input,
    Link,
    Text,
} from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { AppStackProps } from "../AppStack";

export function SignIn() {
  const { navigate } = useNavigation<AppStackProps>();

  function goToLogin() {
    navigate("Login");
  }

  function registerWithGoogle() {
    const auth = getAuth();
    const email = "teste3@teste.com";
    const password = "123456";

    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Register error ======>", errorCode, errorMessage);
    });
  }

  return (
    <Box
      flex="1"
      bg="white"
      px="10"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="5xl" bold color="blue.400" mb={4} shadow={2}>
        Sign In 🗨️
      </Text>

      <FormControl mb={4}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Digite seu e-mail"
          mb={4}
          rounded="xl"
          borderColor="blue.400"
          borderWidth={2}
        />

        <FormControl.Label>Senha</FormControl.Label>
        <Input
          placeholder="Digite sua senha"
          mb={4}
          rounded="xl"
          borderColor="blue.400"
          borderWidth={2}
        />
      </FormControl>

      <Button
        onPress={registerWithGoogle}
        mb={4}
        rounded="xl"
        bg="blue.400"
        py="3"
        w="full"
        _text={{ color: "white", fontWeight: "bold", fontSize: "lg" }}
      >
        Sign In
      </Button>

      <HStack mb={4} space="1.5" alignSelf="center" alignItems="center">
        <Text color="gray.400">Não tem uma conta?</Text>
        <Link
          isExternal
          _text={{
            color: "blue.400",
            fontWeight: "bold",
            fontSize: "md",
            textDecoration: "none",
          }}
          onPress={goToLogin}
        >
          Faça o login
        </Link>
      </HStack>
    </Box>
  );
}
