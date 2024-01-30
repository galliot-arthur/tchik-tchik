"use client";
import { post } from "@/libs/api/fetch";
import { Login, login } from "@/libs/domain/type/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link as UiLink } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, getValues, trigger } = useForm<Login>({
    resolver: zodResolver(login),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  return (
    <div>
      <form
        className="border-2 py-4 px-6 rounded-lg shadow-sm flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          trigger().then((isValid) => {
            isValid && post(getValues());
          });
        }}
      >
        <h1>Admin</h1>
        <Input label="username" required {...register("username")} />
        <Input
          label="password"
          required
          type="password"
          {...register("password")}
        />
        <Button type="submit" variant="shadow" color="primary">
          Login
        </Button>
        <UiLink as={Link} href="link" size="sm">
          J&apos;ai oublié mon mot de passe
        </UiLink>
      </form>
    </div>
  );
}
