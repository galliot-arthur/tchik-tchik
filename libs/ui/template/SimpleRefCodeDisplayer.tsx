import { SimpleRefCode } from "@/libs/domain/type/movie";
import Typography from "../atoms/Typography";
import TchikLink from "../atoms/TchikLink";

export default function SimpleRefCodeDisplayer({
  refCode,
  label,
  linkList,
}: {
  refCode: SimpleRefCode[];
  label: string;
  linkList?: boolean;
}) {
  if (refCode.length === 0) {
    return <></>;
  }
  return (
    <>
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
              <Typography>
                <small className="text-default-500">{ref.label} : </small>
                <span>{ref.value}</span>
              </Typography>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
