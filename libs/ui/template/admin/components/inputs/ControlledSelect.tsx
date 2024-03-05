"use client";
import { SimpleRefCode } from "@/libs/domain/type/ressources";
import { Select, SelectItem } from "@nextui-org/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  options: SimpleRefCode[];
};
export default function ControlledSelect<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          label={`${label}${required ? " *" : ""}`}
          required
          selectedKeys={[field.value]}
          className={className}
          errorMessage={error?.message}
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}
