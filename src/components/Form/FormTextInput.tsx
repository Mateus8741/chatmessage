import { Controller, FieldValues } from "react-hook-form";
import { TextInput } from "../TextInput/TextInput";

interface FormTextInputProps {
  name: FieldValues["name"];
  control: FieldValues["control"];

  label: string;
  placeholder: string;
}

export function FormTextInput({
  name,
  control,
  label,
  placeholder,
}: FormTextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextInput
          label={label}
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}
