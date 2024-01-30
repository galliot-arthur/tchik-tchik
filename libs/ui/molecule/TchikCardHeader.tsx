import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function TchikCardHeader({
  title,
  subtitle,
  caption,
  className,
}: ComponentProps<{
  title: string;
  subtitle: string;
  caption?: string;
}>) {
  return (
    <div
      className={classNames(
        "flex-col justify-between items-end py-0.5 px-0 min-w-64",
        className
      )}
    >
      <div className="flex justify-between w-full">
        <div className="pb-1 text-start">
          <h4 className="font-bold text-large">{title}</h4>
          <p className="text-tiny uppercase font-bold">{subtitle}</p>
        </div>
        <div>
          {caption && <small className="text-default-500">{caption}</small>}
        </div>
      </div>
      {/* {seeMore && (
      <Button color="default" radius="full" size="sm" variant="light">
        {seeMore}
      </Button>
    )} */}
    </div>
  );
}
