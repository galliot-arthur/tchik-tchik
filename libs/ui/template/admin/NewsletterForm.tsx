"use client";

import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import ControlledInput from "./components/inputs/ControlledInput";
import Typography from "../../atoms/Typography";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { post, put } from "@/libs/api/fetch";
import ControlledTipTap from "./components/inputs/ControlledTipTap";
import { ressources } from "@/libs/domain/type/ressources";
import { NewsletterType, newsletterType } from "@/libs/domain/type/newsletter";
import { useState } from "react";

type Props = {
  defaultValues?: NewsletterType;
};

export default function NewsletterForm({ defaultValues }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<NewsletterType>({
    resolver: zodResolver(newsletterType),
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
          setIsLoading(true);
          const data = getValues();

          if (data === undefined) {
            return;
          }
          const response = defaultValues?.id
            ? await put(data, defaultValues.id, ressources.newsletters)
            : await post(data, ressources.newsletters);

          if ("id" in response) {
            return router.push("/admin");
          }

          console.error(response);
          setIsLoading(false);
        }}
      >
        <Typography variant="h2" className="w-full">
          Info générales
        </Typography>
        <ControlledInput
          label="Titre"
          required
          control={control}
          name="title"
          className="w-[calc(50%-0.5rem)]"
        />

        <ControlledTipTap
          label="Contenu"
          control={control}
          name="content"
          type="complex"
        />

        <div className="flex w-full justify-end gap-2">
          <Button
            onClick={() => router.push("/admin")}
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
