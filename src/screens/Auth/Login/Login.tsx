import { Box, Button, FormControl, HStack, Link, Text } from "native-base";
import React from "react";
import { Alert, KeyboardAvoidingView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FormTextInput } from "../../../components/Form/FormTextInput";
import { AppStackProps } from "../../../routes/AppStack";
import { LoginSchema } from "./loginScheema";

import Logo from "../../../assets/logo.svg";

export function Login() {
  const { navigate } = useNavigation<AppStackProps>();

  const { control, handleSubmit } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function loginWithEmail({ email, password }: LoginSchema) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          navigate("Chat");
        } else {
          Alert.alert("Não foi possível realizar o login");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login error ======>", errorCode, errorMessage);
        Alert.alert("Usuário não encontrado");
      });
  }

  function goToSignIn() {
    navigate("SignUp");
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex="1"
        bg="white"
        px="10"
        alignItems="center"
        justifyContent="center"
      >
        <Logo width={150} height={150} />

        <Text fontSize="3xl" bold color="blue.400" mb={4} shadow={2}>
          Log in
        </Text>

        <FormControl mb={4}>
          <FormTextInput
            name="email"
            control={control}
            label="Email"
            placeholder="Digite seu e-mail"
          />

          <FormTextInput
            name="password"
            control={control}
            label="Senha"
            placeholder="Digite sua senha"
          />
        </FormControl>

        <Button
          onPress={handleSubmit(loginWithEmail)}
          mb={4}
          rounded="xl"
          bg="blue.400"
          py="3"
          w="full"
          _text={{ color: "white", fontWeight: "bold", fontSize: "lg" }}
        >
          Login
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
            onPress={goToSignIn}
          >
            Registre-se
          </Link>
        </HStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
