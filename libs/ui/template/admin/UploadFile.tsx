"use client";

import { getPicture, isAllowedMimeType } from "@/libs/domain/type/file";
import { Button, Chip } from "@nextui-org/react";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Trash3, Upload } from "react-bootstrap-icons";

type Props = {
  value: string | null | undefined;
  onChange: (value: string | undefined) => void;
  removeCallBack?: (index: number) => void;
  index?: number;
  formError?: string;
};

export default function UploadFile({
  value,
  onChange,
  index,
  removeCallBack,
  formError,
}: Props) {
  const [error, setError] = useState<string | undefined>(formError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null | undefined>(value);

  useEffect(() => {
    setError(formError);
  }, [formError]);

  const deleteFile = async () => {
    if (!fileName) {
      return;
    }

    setIsDeleteLoading(true);
    fetch(`/api/files`, {
      method: "DELETE",
      body: JSON.stringify({ file: fileName }),
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.message !== undefined) {
          onChange(undefined);
          setFileName(undefined);

          if (index && index > 0 && removeCallBack) {
            removeCallBack(index);
          }
        }
      })
      .catch((e) => setError("Erreur, merci de rééssayer" + e.message))
      .finally(() => setIsDeleteLoading(false));
  };

  const submitFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const file = [...(e.currentTarget.files ?? [])][0];
      const formData = new FormData();

      if (file === undefined) {
        return;
      }

      if (!isAllowedMimeType(file.type)) {
        setError("Merci de fournir un fichier .jpg ou .png");
        return;
      }

      formData.append("file", file, file.name);

      const res: PutBlobResult = await fetch(`/api/files`, {
        method: "POST",
        body: formData,
      })
        .then((data) => data.json())
        .catch(() => setError("Erreur, merci de rééssayer"));

      onChange(res.url);
      setFileName(res.url);
    } finally {
      setIsLoading(false);
    }
  };

  if (fileName) {
    return (
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Button
          isIconOnly
          size="sm"
          variant="shadow"
          color="danger"
          onClick={deleteFile}
          isLoading={isDeleteLoading}
          className="absolute top-2 right-2 z-10"
        >
          <Trash3 />
        </Button>
        <Image
          src={getPicture(fileName)}
          alt="image"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="py-2">
      <Button as="label" isLoading={isLoading}>
        <Upload />
        Upload
        <input type="file" hidden name="file" onChange={submitFile} />
      </Button>
      {removeCallBack && (
        <Button
          isIconOnly
          size="sm"
          variant="shadow"
          color="danger"
          className="absolute top-2 right-2 z-10"
          onClick={() => index && index > 0 && removeCallBack(index)}
        >
          <Trash3 />
        </Button>
      )}
      {error && <Chip color="danger">{error}</Chip>}
    </div>
  );
}
