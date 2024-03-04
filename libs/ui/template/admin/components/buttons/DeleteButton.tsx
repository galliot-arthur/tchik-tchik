"use client";
import { remove } from "@/libs/api/fetch";
import { Ressources } from "@/libs/domain/type/ressources";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  ressource: Ressources;
};
export default function DeleteButton({ ressource, title, id }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          className="text-lg text-salmon cursor-pointer active:opacity-50"
        >
          <Trash />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Suppression</div>
          <div className="text-tiny">
            Etes vous sûr de vouloir supprimer <b>{title}</b> ?
          </div>
          <div className="flex items-center justify-center pt-4 gap-4">
            <PopoverTrigger>
              <Button
                variant="light"
                className="text-lg cursor-pointer active:opacity-50"
              >
                Annuler
              </Button>
            </PopoverTrigger>
            <Button
              color="danger"
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() =>
                remove(id, ressource).then(() => {
                  setIsOpen(false);
                })
              }
            >
              <Trash />
              Supprimer
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
