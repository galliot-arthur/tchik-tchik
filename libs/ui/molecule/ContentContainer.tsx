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
        "mt-2 md:mt-4",
        borderTop ? "pt-4" : "pt-3",
        borderTop && "border-t-2 border-gray-500"
      )}
    >
      {children}
    </div>
  );
}
