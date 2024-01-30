import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function RightSection({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <section
      className={classNames(
        "hidden sm:block sm:w-1/4 text-end p-[1rem]",
        className
      )}
    >
      <ul className="pl-3 py-2 border-t-2 border-gray-500 flex flex-col">
        {children}
      </ul>
    </section>
  );
}
