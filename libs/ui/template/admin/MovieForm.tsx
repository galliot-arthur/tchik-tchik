"use client";

import { MovieType, movieKind, movieType } from "@/libs/domain/type/movie";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import ControlledInput from "./components/inputs/ControlledInput";
import ControlledSelect from "./components/inputs/ControlledSelect";
import ControlledTextArea from "./components/inputs/ControlledTextArea";
import ControlledFieldArray from "./components/inputs/ControlledFieldArray";
import Typography from "../../atoms/Typography";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { post, put } from "@/libs/api/fetch";
import ressources from "@/libs/domain/type/ressources";
import ControlledTipTap from "./components/inputs/ControlledTipTap";

type Props = {
  defaultValues?: MovieType;
};

export default function MovieForm({ defaultValues }: Props) {
  const router = useRouter();
  const { control, getValues } = useForm<MovieType>({
    resolver: zodResolver(movieType),
    defaultValues: defaultValues,
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  return (
    <div className="mt-4">
      <form
        className="rounded-lg py-4 px-6 flex flex-row flex-wrap gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = getValues();

          if (data === undefined) {
            return;
          }
          const response = defaultValues?.id
            ? await put(data, defaultValues.id, ressources.movies)
            : await post(data, ressources.movies);

          if (response?.name !== undefined) {
            return router.push("/admin");
          }

          console.error(response);
        }}
      >
        <Typography variant="h2" className="w-full">
          Info générales
        </Typography>
        <ControlledInput
          label="Nom du film"
          required
          control={control}
          name="name"
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledInput
          label="Réalisé par"
          required
          control={control}
          name="director"
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledInput
          label="Ecrit par"
          control={control}
          name="writtenBy"
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledInput
          label="Durée"
          required
          control={control}
          name="duration"
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledInput
          label="Année de production"
          required
          type="number"
          control={control}
          name="releaseYear"
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledSelect
          label="Type"
          required
          control={control}
          name="kind"
          options={movieKind.map((k) => ({ value: k, label: k }))}
          className="w-[calc(50%-0.5rem)]"
        />
        <ControlledTextArea
          label="Pitch"
          required
          control={control}
          name="bio"
        />
        <ControlledFieldArray
          label={{ label: "Titre", value: "Noms", block: "Staffing" }}
          control={control}
          name="staff"
          className="w-full"
        />
        <ControlledFieldArray
          label={{ label: "Label", value: "Url", block: "Diffusion" }}
          control={control}
          name="diffusion"
          className="w-full"
        />

        <ControlledFieldArray
          label={{ label: "Label", value: "Url", block: "Press" }}
          control={control}
          name="press"
          className="w-full"
        />
        <Typography variant="h2">Autres</Typography>

        <ControlledTipTap
          label="Festivals"
          control={control}
          name="festivals"
        />

        <ControlledInput
          label="Spoiler"
          //type="url"
          control={control}
          name="spoiler"
        />
        <div className="flex w-full justify-end gap-2">
          <Button
            onClick={() => router.push("/admin")}
            variant="ghost"
            color="default"
          >
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Valider
          </Button>
        </div>
      </form>
    </div>
  );
}
