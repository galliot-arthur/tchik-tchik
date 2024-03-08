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
      <ul className="-mt-2 md:mt-0 md:py-4 md:border-t-2 border-bl flex flex-col">
        {children}
      </ul>
    </section>
  );
}
