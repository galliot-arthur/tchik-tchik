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
        "mx-4 py-4 flex flex-col gap-6",
        fullwidth ? "sm:w-1/2" : "sm:w-1/4",
        className
      )}
    >
      {children}
    </section>
  );
}
