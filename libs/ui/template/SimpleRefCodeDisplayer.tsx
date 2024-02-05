import { SimpleRefCode } from "@/libs/domain/type/movie";
import Typography from "../atoms/Typography";
import TchikLink from "../atoms/TchikLink";
import { ComponentProps } from "@/libs/domain/type/ui";
import classNames from "classnames";

export default function SimpleRefCodeDisplayer({
  refCode,
  label,
  linkList,
  className,
}: ComponentProps<{
  refCode: SimpleRefCode[];
  label: string;
  linkList?: boolean;
}>) {
  if (refCode.length === 0) {
    return <></>;
  }
  return (
    <div
      className={classNames(className, linkList ? "text-start" : "text-center")}
    >
      <Typography variant="h2" className="mt-4">
        {label}
      </Typography>
      <ul>
        {refCode.map((ref) => (
          <li key={ref.value}>
            {linkList ? (
              <TchikLink
                href={ref.value}
                target="_blank"
                className="text-salmon"
              >
                {ref.label}
              </TchikLink>
            ) : (
              <div className="my-1">
                <Typography color="gray-500" className="text-tiny">
                  {ref.label} :
                </Typography>
                <Typography>{ref.value}</Typography>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
