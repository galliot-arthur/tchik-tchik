import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function LeftSection({
  children,
  className,
  dividedBy3,
}: ComponentProps<{ dividedBy3?: boolean }>) {
  return (
    <section
      className={classNames(
        className,
        "grow-0 w-full",
        dividedBy3 ? "md:w-[calc(60%-1rem)]" : "md:w-[calc(50%-1rem)]"
      )}
    >
      <div className="px-0 pt-2 border-t-2 border-bl">{children}</div>
    </section>
  );
}
// w-full sm:
