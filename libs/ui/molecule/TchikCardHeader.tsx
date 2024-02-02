import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function TchikCardHeader({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  caption,
  caption2,
  className,
}: ComponentProps<{
  title: string;
  subtitle: string;
  subtitle2?: string;
  subtitle3?: string;
  caption?: string;
  caption2?: string;
}>) {
  return (
    <div
      className={classNames(
        "flex-col justify-between items-end py-0.5 px-0 min-w-64",
        className
      )}
    >
      <div className="flex justify-between w-full">
        <div className="pb-1 text-start max-w-80">
          <h4 className="font-bold text-large">{title}</h4>
          <p className="text-tiny uppercase font-bold">{subtitle}</p>
          {subtitle2 && (
            <p className="text-tiny uppercase font-bold">{subtitle2}</p>
          )}
          {subtitle3 && (
            <p className="text-tiny uppercase font-bold">{subtitle3}</p>
          )}
        </div>
        <div style={{ lineHeight: "1.15" }}>
          {caption && <small className="text-default-500">{caption}</small>}
          {caption2 && (
            <>
              <br />
              <small className="text-default-500">{caption2}</small>
            </>
          )}
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
