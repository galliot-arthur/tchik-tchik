import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function LeftSection({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <section className={classNames("sm:w-1/2 p-[1rem] ", className)}>
      <div className="px-0 sm:pr-3 py-2 border-t-2 border-gray-500">
        {children}
      </div>
    </section>
  );
}
