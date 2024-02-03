import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
import Typography from "../atoms/Typography";

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
          <Typography variant="h4">{title}</Typography>
          <Typography variant="tiny-bold" color="black">
            {subtitle}
          </Typography>
          {subtitle2 && (
            <Typography variant="tiny-bold" color="black">
              {subtitle2}
            </Typography>
          )}
          {subtitle3 && (
            <Typography variant="tiny-bold" color="black">
              {subtitle3}
            </Typography>
          )}
        </div>
        <div
          style={{ lineHeight: "1.15", whiteSpace: "nowrap" }}
          className="text-end ml-4 text-no-wrap mt-1"
        >
          {caption && <small className="text-default-500">{caption}</small>}
          {caption2 && (
            <>
              <br />
              <small className="text-default-500">{caption2}</small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
