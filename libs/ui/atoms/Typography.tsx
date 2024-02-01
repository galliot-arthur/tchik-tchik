import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
type Variant = "p" | "p2" | "span" | "h1" | "h2" | "h3" | "h4" | "tiny-bold";

export default function Typography({
  children,
  className,
  variant = "p",
}: ComponentProps<{ variant?: Variant }>) {
  switch (variant) {
    case "p":
      return <p className={classNames(className)}>{children}</p>;
    case "p2":
      return (
        <p className={classNames(className, "text-gray-500")}>{children}</p>
      );
    case "tiny-bold":
      return (
        <p
          className={classNames(
            className,
            "text-tiny uppercase font-bold text-salmon"
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
            "font-black text-[4rem] leading-[3.65rem] -ml-[3px]",
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={classNames(className, "text-2xl font-black text-gray-500")}
        >
          {children}
        </h2>
      );
    case "h3":
      return <h3 className={classNames(className, "text-lg")}>{children}</h3>;
    case "h4":
      return (
        <h4 className={classNames(className, "font-bold text-large")}>
          {children}
        </h4>
      );
    default:
      return <p className={classNames(className)}>{children}</p>;
  }
}
