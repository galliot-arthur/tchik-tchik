import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function MiddleSection({
  children,
  className,
  fullwidth = false,
}: ComponentProps<{ fullwidth?: boolean }>) {
  return (
    <section
      className={classNames(
        "w-full",
        fullwidth ? "md:w-2/5" : "md:w-1/4",
        "flex flex-col items-start gap-2 md:gap-4",
        className
      )}
    >
      {children}
    </section>
  );
}
