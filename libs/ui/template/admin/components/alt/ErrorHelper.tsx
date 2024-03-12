import { ComponentProps } from "@/libs/domain/type/ui";
import Typography from "@/libs/ui/atoms/Typography";
import { FieldErrors } from "react-hook-form";

export default function ErrorsHelper<T extends object>({
  errors,
}: ComponentProps<{
  errors: FieldErrors<T>;
}>) {
  return (
    <div className="text-end">
      {Object.entries(errors).map((error) => (
        <Typography key={error[0]} color="salmon" className="text-sm">
          <span className="text-xs text-gray-500">{error[0]} : </span>
          {error[1].message ?? "Merci de vérifier les informations"}
        </Typography>
      ))}
    </div>
  );
}
