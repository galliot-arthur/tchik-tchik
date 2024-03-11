"use client";
import { MovieType } from "@/libs/domain/type/movie";
import ControlledSelect from "./components/inputs/ControlledSelect";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "@/libs/api/fetch";
import { ShowedType, showed } from "@/libs/domain/type/showed";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";

export default function Showed({
  movies,
  defaultValues,
}: {
  movies: MovieType[];
  defaultValues: ShowedType;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<ShowedType>({
    resolver: zodResolver(showed),
    defaultValues: defaultValues,
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  return (
    <div className="mt-4">
      <form
        className="rounded-lg py-4 px-6 flex flex-row flex-wrap gap-4"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            setIsLoading(true);
            const data = getValues();

            if (data === undefined) {
              return;
            }
            const response = await post(data, ressources.showed);

            if ("message" in response) {
              return;
            }

            return router.push(i18n.menu.admin.url);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <ControlledSelect
          label="Type"
          required
          control={control}
          name="showedId"
          options={movies.map((k) => ({ value: k.id, label: k.name }))}
          className="w-[calc(50%-0.5rem)]"
        />

        <div className="flex w-full justify-end gap-2">
          <Button
            onClick={() => router.push(i18n.menu.admin.url)}
            variant="ghost"
            color="default"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            color={isValid ? "primary" : "default"}
            isLoading={isLoading}
            disabled={!isValid}
          >
            Valider
          </Button>
        </div>
      </form>
    </div>
  );
}
