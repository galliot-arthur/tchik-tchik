import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function ContentContainer({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <main
      className={classNames(
        className,
        "mt-4 pt-4",
        "border-t-2 border-gray-500"
      )}
    >
      {children}
    </main>
  );
}
