"use client";

import { MovieType, createMovie, movieKind } from "@/libs/domain/type/movie";
import { Button, Tooltip } from "@nextui-org/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ControlledInput from "./components/inputs/ControlledInput";
import ControlledSelect from "./components/inputs/ControlledSelect";
import ControlledTextArea from "./components/inputs/ControlledTextArea";
import ControlledFieldArray from "./components/inputs/ControlledFieldArray";
import Typography from "../../atoms/Typography";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { post, put } from "@/libs/api/fetch";
import ControlledTipTap from "./components/inputs/ControlledTipTap";
import { ressources } from "@/libs/domain/type/ressources";
import { useState } from "react";
import UploadFile from "./UploadFile";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
  PlusCircle,
  QuestionCircleFill,
} from "react-bootstrap-icons";
import { i18n } from "@/libs/i18n/i18n";
import ErrorsHelper from "./components/alt/ErrorHelper";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  defaultValues?: MovieType;
};

const handlleDefaltValues = (defaultValues?: MovieType): MovieType => {
  if (defaultValues?.pictures.length && defaultValues?.pictures.length > 0) {
    return defaultValues;
  }
  //@ts-ignore
  return { ...defaultValues, pictures: [{ id: undefined }] };
};

export default function MovieForm({ defaultValues }: Props) {
  const [parent] = useAutoAnimate();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm<MovieType>({
    resolver: zodResolver(createMovie),
    defaultValues: handlleDefaltValues(defaultValues),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const { fields, append, remove, swap } = useFieldArray({
    control: control,
    name: "pictures",
  });

  return (
    <div className="mt-4">
      <form
        className="rounded-lg py-4 px-6 flex flex-row flex-wrap gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          trigger();

          setIsLoading(true);
          const data = getValues();

          if (data === undefined) {
            return;
          }
          const response = defaultValues?.id
            ? await put(data, defaultValues.id, ressources.movies)
            : await post(data, ressources.movies);

          if ("id" in response) {
            return router.push(`${i18n.menu.admin.url}`);
          }

          console.error(response);
          setIsLoading(false);
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
          label="Cooproduit par"
          control={control}
          name="coproducedBy"
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
        <ControlledInput
          label="Statut"
          control={control}
          name="status"
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
          type="simple"
        />

        <ControlledInput
          label="Bande annonce"
          control={control}
          name="spoiler"
          className="w-[calc(90%-0.5rem)]"
          //
        />
        <div className="w-[calc(10%-0.5rem)] flex items-center">
          <Tooltip
            content={
              <code>
                Ne placer ici que le lien, par exemple ici en gras :
                <br />
                <span className="text-default-500">
                  &lt;iframe title=&quot;vimeo-player&quot; src=&quot;
                </span>
                <span className="font-bold">
                  https://player.vimeo.com/video/892728295?h=5adfa164ae
                </span>
                <span className="text-default-500">
                  &quot; width=&quot;640&quot; height=&quot;360&quot;
                  &gt;&lt;/iframe&gt;
                </span>
              </code>
            }
          >
            <QuestionCircleFill />
          </Tooltip>
        </div>

        <Typography variant="h2">Affiche</Typography>
        <div className="w-full grid grid-cols-4 gap-4">
          <Controller
            control={control}
            name="cover"
            render={({ field }) => (
              <UploadFile {...field} formError={errors.cover?.message} />
            )}
          />
        </div>

        <Typography variant="h2" className="w-full">
          Photogrammes
        </Typography>
        <Button onClick={() => append({ id: undefined } as any)} size="sm">
          <PlusCircle />
          Add
        </Button>
        <div className="w-full grid grid-cols-4 gap-4" ref={parent}>
          {fields.map((field, index) => (
            <div className="w-full relative" key={field.id}>
              <Controller
                control={control}
                name={`pictures.${index}.id`}
                render={({ field }) => (
                  <UploadFile
                    {...field}
                    removeCallBack={(index) => remove(index)}
                    index={index}
                    formError={errors.pictures?.at?.(index)?.message}
                  />
                )}
              />
              {index !== 0 && (
                <Button
                  isIconOnly
                  className="absolute bottom-2 left-2"
                  size="sm"
                  onClick={() => swap(index, index - 1)}
                >
                  <ArrowLeftCircleFill />
                </Button>
              )}
              {index < fields.length - 1 && (
                <Button
                  isIconOnly
                  className="absolute bottom-2 right-2"
                  size="sm"
                  onClick={() => swap(index, index + 1)}
                >
                  <ArrowRightCircleFill />
                </Button>
              )}
            </div>
          ))}
        </div>

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
          >
            Valider
          </Button>
        </div>
        <ErrorsHelper errors={errors} />
      </form>
    </div>
  );
}
