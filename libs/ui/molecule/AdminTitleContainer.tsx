import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function AdminTitleContainer({
  children,
  className,
}: ComponentProps<{}>) {
  return (
    <div className={classNames(className, "ml-4 md:mt-0")}>{children}</div>
  );
}
