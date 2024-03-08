import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function ContentContainer({
  children,
  className,
  borderTop = true,
}: ComponentProps<{ borderTop?: boolean }>) {
  return (
    <div
      className={classNames(
        className,
        borderTop && "mt-2 md:mt-4",
        borderTop ? "pt-4" : "pt-0",
        borderTop && "border-t-2 border-bl"
      )}
    >
      {children}
    </div>
  );
}
