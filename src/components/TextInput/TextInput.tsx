import { Box, FormControl, Input, Text } from "native-base";
import React from "react";
import { TextInputProps as RNTextInputProps } from "react-native";

export interface TextInputProps extends RNTextInputProps {
  label: string;
  placeholder: string;
  errorMessage?: string;
}

export function TextInput({
  label,
  placeholder,
  errorMessage,
  ...rnTextInputProps
}: TextInputProps) {
  return (
    <Box mb={4}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        rounded="xl"
        borderColor="blue.400"
        borderWidth={2}
        {...rnTextInputProps}
      />
      {errorMessage && (
        <Text fontSize="xs" color="red.400" mt="3">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
}
