import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
type Variant = "p" | "p2" | "span" | "h1" | "h2" | "h3" | "h4" | "tiny-bold";
type Color = "black" | "salmon" | "gray-500" | "white";
export default function Typography({
  children,
  className,
  variant = "p",
  color,
}: ComponentProps<{ variant?: Variant; color?: Color }>) {
  switch (variant) {
    case "p":
      return (
        <p
          className={classNames(
            className,
            color ? `text-${color}` : "text-black"
          )}
        >
          {children}
        </p>
      );
    case "p2":
      return (
        <p
          className={classNames(
            className,
            color ? `text-${color}` : "text-gray-500"
          )}
        >
          {children}
        </p>
      );
    case "tiny-bold":
      return (
        <p
          className={classNames(
            "text-tiny uppercase font-bold",
            color ? `text-${color}` : "text-salmon",
            className
          )}
        >
          {children}
        </p>
      );
    case "span":
      return <span className={classNames(className)}>{children}</span>;
    case "h1":
      return (
        <h1
          className={classNames(
            "font-black text-[2rem] sm:text-[4rem] leading-[2rem] sm:leading-[3.65rem] sm:-ml-[3px]",
            color ? `text-${color}` : "text-black",
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={classNames(
            className,
            "text-xl font-black",
            color ? `text-${color}` : "text-black"
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={classNames(
            className,
            "text-lg",
            color ? `text-${color}` : "text-black"
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={classNames(
            className,
            "font-bold text-large leading-none my-[0.30rem]",
            color ? `text-${color}` : "text-black"
          )}
        >
          {children}
        </h4>
      );
    default:
      return (
        <p
          className={classNames(
            className,
            color ? `text-${color}` : "text-black"
          )}
        >
          {children}
        </p>
      );
  }
}
