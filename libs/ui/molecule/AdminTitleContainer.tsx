import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
import TchikLink from "../atoms/TchikLink";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

export default function AdminTitleContainer({
  children,
  className,
  hideGoback = false,
}: ComponentProps<{ hideGoback?: boolean }>) {
  return (
    <div className={classNames(className, "ml-4 md:mt-0")}>
      {children}
      {hideGoback === false && (
        <TchikLink
          href={"/admin"}
          variant="red"
          className="inline-flex flex-row items-center gap-1"
        >
          <ArrowLeftCircleFill />
          Retour à l&apos;admin
        </TchikLink>
      )}
    </div>
  );
}
