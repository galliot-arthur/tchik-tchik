import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function TchikLink({
  href,
  target = "_self",
  variant = "default",
  children,
  className,
}: ComponentProps<{
  href: string;
  target?: HTMLAttributeAnchorTarget;
  variant?: "default" | "red";
}>) {
  return (
    <Link
      href={href}
      target={target}
      className={classNames(
        "hover-underline",
        className,
        variant === "red" ? "text-gray-500" : "font-bold"
      )}
    >
      {children}
    </Link>
  );
}
