"use client";

import { Textarea } from "@nextui-org/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};
export default function ControlledTextArea<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          label={`${label}${required ? " *" : ""}`}
          {...field}
          required
          minRows={4}
          className={className}
          errorMessage={error?.message}
        />
      )}
    />
  );
}
