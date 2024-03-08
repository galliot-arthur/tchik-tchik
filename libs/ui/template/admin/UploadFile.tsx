"use client";

import { isAllowedMimeType } from "@/libs/domain/type/file";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Trash3, Upload } from "react-bootstrap-icons";

type Props = {
  value: string | null | undefined;
  onChange: (value: string | undefined) => void;
};

export default function UploadFile({ value, onChange }: Props) {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null | undefined>(value);

  const deleteFile = async () => {
    if (!fileName) {
      return;
    }

    setIsDeleteLoading(true);
    fetch(`/api/files/${fileName}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.message !== undefined) {
          onChange(undefined);
          setFileName(undefined);
        }
      })
      .catch(() => setError("Erreur, merci de rééssayer"))
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

      const res = await fetch(`/api/files`, {
        method: "POST",
        body: formData,
      })
        .then((data) => data.json())
        .catch(() => setError("Erreur, merci de rééssayer"));

      onChange(res.fileName);
      setFileName(res.fileName);
    } finally {
      setIsLoading(false);
    }
  };

  if (fileName) {
    return (
      <div className="relative aspect-square w-1/2 rounded-lg overflow-hidden">
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
          src={`/pictures/${fileName}`}
          alt="image"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="p-2">
      <Button as="label" isLoading={isLoading}>
        <Upload />
        Upload
        <input type="file" hidden name="file" onChange={submitFile} />
      </Button>
      {error && <Chip color="danger">{error}</Chip>}
    </div>
  );
}
