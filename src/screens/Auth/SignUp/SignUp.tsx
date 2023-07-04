import { Box, Button, FormControl, HStack, Link, Text } from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { FormTextInput } from "../../../components/Form/FormTextInput";
import { AppStackProps } from "../../../routes/AppStack";
import { SignUpSchema } from "./signUpScheema";

export function SignUp() {
  const { navigate } = useNavigation<AppStackProps>();
  const { control, handleSubmit } = useForm<SignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function goToLogin() {
    navigate("Login");
  }

  function registerWithGoogle({ email, password }: SignUpSchema) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      if (user) {
        navigate("Login");
        Alert.alert("Conta criada com sucesso! Agora você pode fazer o login");
      } else {
        Alert.alert("Não foi possível realizar o login");
      }
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
        Sign Up 🗨️
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
        onPress={handleSubmit(registerWithGoogle)}
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
