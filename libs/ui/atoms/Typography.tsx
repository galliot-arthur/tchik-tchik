import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
type Variant = "p" | "p2" | "span" | "h1" | "h2" | "h3" | "h4";

export default function Typography({
  children,
  className,
  variant = "p",
}: ComponentProps<{ variant?: Variant }>) {
  const props = { className: classNames(className) };
  switch (variant) {
    case "p":
      return <p className={classNames(className, "text-large")}>{children}</p>;
    case "p2":
      return <p className={classNames(className)}>{children}</p>;
    case "span":
      return <span className={classNames(className)}>{children}</span>;
    case "h1":
      return (
        <h1
          className={classNames(
            className,
            "font-bold text-[4rem] leading-[3.65rem]"
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return <h2 className={classNames(className, "text-xl")}>{children}</h2>;
    case "h3":
      return <h3 className={classNames(className, "text-lg")}>{children}</h3>;
    case "h4":
      return <h4 className={classNames(className, "text-2xl")}>{children}</h4>;
    default:
      return <p className={classNames(className)}>{children}</p>;
  }
}
