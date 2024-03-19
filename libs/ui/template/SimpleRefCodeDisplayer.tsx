import Typography from "../atoms/Typography";
import TchikLink from "../atoms/TchikLink";
import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";
import { SimpleRefCode } from "@/libs/domain/type/ressources";

export default function SimpleRefCodeDisplayer({
  refCode,
  label,
  linkList,
  className,
}: ComponentProps<{
  refCode: SimpleRefCode[];
  label?: string;
  linkList?: boolean;
}>) {
  if (refCode.length === 0) {
    return <></>;
  }
  return (
    <div className={classNames(className, "text-start")}>
      {label && (
        <Typography
          variant="h2"
          className={classNames("mt-4", linkList && "!text-sm")}
        >
          {label}
        </Typography>
      )}
      <ul>
        {refCode.map((ref) => (
          <li key={ref.value}>
            {linkList ? (
              <TchikLink
                href={ref.value}
                target="_blank"
                className="text-salmon !text-sm"
              >
                {ref.label}
              </TchikLink>
            ) : (
              <Typography className="text-sm">
                <span className="text-tiny text-gray-500">{ref.label} : </span>
                {ref.value}
              </Typography>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
