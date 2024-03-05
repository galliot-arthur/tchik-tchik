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
  type: "simple" | "complex";
};

const simpleInput = [commands.bold, commands.italic];
const newsletterInput = [
  commands.bold,
  commands.italic,
  commands.link,
  commands.unorderedListCommand,
];

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
  type = "simple",
}: ControllerRenderProps & Omit<Props<T>, "name" | "control">) {
  return (
    <div className="w-full">
      <MDEditor
        value={value}
        defaultValue={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={type === "simple" ? simpleInput : newsletterInput}
      />
    </div>
  );
}
