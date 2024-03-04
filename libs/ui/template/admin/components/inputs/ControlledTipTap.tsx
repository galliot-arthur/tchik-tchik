"use client";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export default function ControlledTipTap<T extends {}>({
  control,
  name,
  ...rest
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TipTapInput {...field} {...rest} />}
    />
  );
}

function TipTapInput<T extends {}>({
  value,
  onChange,
}: ControllerRenderProps & Omit<Props<T>, "name" | "control">) {
  return (
    <div className="w-full">
      <MDEditor
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[commands.bold, commands.italic]}
      />
    </div>
  );
}
