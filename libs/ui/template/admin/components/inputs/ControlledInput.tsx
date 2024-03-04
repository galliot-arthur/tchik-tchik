"use client";

import { Input } from "@nextui-org/react";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute;
};
export default function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  type = "text",
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label={`${label}${required ? " *" : ""}`}
          type={type}
          required
          onChange={({ currentTarget: { value } }) => {
            if (type === "number") {
              field.onChange(parseInt(value));
              return;
            }
            field.onChange(value);
          }}
          className={className}
          errorMessage={error?.message}
        />
      )}
    />
  );
}
