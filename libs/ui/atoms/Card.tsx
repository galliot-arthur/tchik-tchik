import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function Card({ children, className }: ComponentProps<{}>) {
  return (
    <div
      className={classNames(
        className,
        "bg-gradient md:rounded-sm tchik-shadow px-4 py-2 md:px-2 md:py-[0.33rem] -mx-4 md:mx-0"
      )}
    >
      {children}
    </div>
  );
}
