import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function LeftSection({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <section
      className={classNames(className, "grow-0 w-full md:w-[calc(50%-1rem)]")}
    >
      <div className="px-0 pt-2 border-t-2 border-bl">{children}</div>
    </section>
  );
}
// w-full sm:
