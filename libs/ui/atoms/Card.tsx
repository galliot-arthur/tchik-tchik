import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function Card({ children, className }: ComponentProps<{}>) {
  return (
    <div
      className={classNames(
        className,
        "bg-gradient md:rounded-sm tchik-shadow px-3 py-2 -mx-4 md:mx-0"
      )}
    >
      {children}
    </div>
  );
}
