import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function RightSection({
  children,
  className,
  hideOnPhone = false,
}: ComponentProps<{ hideOnPhone?: boolean }>) {
  return (
    <section
      className={classNames(
        "w-full md:w-[calc(25%-1rem)]",
        hideOnPhone && "hidden md:block",
        "text-end",
        className
      )}
    >
      <ul className="pl-3 py-2 border-t-2 border-gray-500 flex flex-col">
        {children}
      </ul>
    </section>
  );
}
