import Typography from "@/libs/ui/atoms/Typography";
import {
  ArrayPath,
  Control,
  FieldValues,
  Path,
  useFieldArray,
} from "react-hook-form";
import ControlledInput from "./ControlledInput";
import { Button, Tooltip } from "@nextui-org/react";
import {
  ArrowDownShort,
  ArrowUpShort,
  PlusCircle,
  Trash,
} from "react-bootstrap-icons";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: ArrayPath<T>;
  label: { value: string; label: string; block: string };
  className?: string;
};

export default function ControlledFieldArray<T extends FieldValues>({
  control,
  name,
  label,
  className,
}: Props<T>) {
  const { fields, remove, move, append } = useFieldArray({
    control: control,
    name: name,
    rules: { minLength: 1 },
  });

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 justify-between">
          <Typography variant="h2">{label.block}</Typography>
        </div>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div className="flex gap-4" key={field.id}>
              <ControlledInput
                label={label.label}
                control={control}
                name={`${name}.${index}.label` as Path<T>}
              />
              <ControlledInput
                label={label.value}
                control={control}
                name={`${name}.${index}.value` as Path<T>}
              />
              <div className="relative flex items-center gap-0">
                <Tooltip content="Descendre d'un cran">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onClick={() => move(index, index + 1)}
                    className="text-lg active:opacity-50"
                  >
                    <ArrowDownShort />
                  </Button>
                </Tooltip>
                <Tooltip content="Monter d'un cran">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onClick={() => move(index, index - 1)}
                    className="text-lg active:opacity-50"
                  >
                    <ArrowUpShort />
                  </Button>
                </Tooltip>
                <Tooltip content="Supprimer">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onClick={() => remove(index)}
                    className="text-lg text-salmon       active:opacity-50"
                  >
                    <Trash />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="light"
              size="sm"
              aria-label="Ajouter un nouveau"
              onClick={() =>
                append({
                  label: "",
                  value: "",
                } as any)
              }
              className="text-lg active:opacity-50"
            >
              <PlusCircle />
              Ajouter un nouveau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
