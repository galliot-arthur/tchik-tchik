import { Ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { PlusCircle } from "react-bootstrap-icons";

type Props = {
  ressource: Ressources;
  addLabel: string;
};
export default function RessourceTableHeader({ ressource, addLabel }: Props) {
  return (
    <div className="flex flex-row justify-end pb-2 px-4">
      <Button
        size="sm"
        variant="bordered"
        as={Link}
        href={`${i18n.menu.admin.url}/${ressource}/create`}
        className="text-lg cursor-pointer active:opacity-50"
        startContent={<PlusCircle />}
      >
        {addLabel}
      </Button>
    </div>
  );
}
