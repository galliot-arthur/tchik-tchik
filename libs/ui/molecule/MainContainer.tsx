import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function MainContainer({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <main
      className={classNames(
        className,
        "flex flex-col sm:flex-row flex-wrap gap-4",
        "min-h-[calc(100vh-8.5rem)]",
        "relative top-20 md:top-16 px-4 mb-8"
      )}
    >
      {children}
    </main>
  );
}
