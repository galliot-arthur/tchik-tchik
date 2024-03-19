import { Ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { Button, Chip } from "@nextui-org/react";
import classNames from "classnames";
import Link from "next/link";
import { PlusCircle } from "react-bootstrap-icons";

type Props = {
  ressource: Ressources;
  addLabel: string;
  error?: string;
};
export default function RessourceTableHeader({
  ressource,
  addLabel,
  error,
}: Props) {
  return (
    <div
      className={classNames(
        "flex flex-row pb-2 px-4 items-center",
        error ? "justify-between" : "justify-end"
      )}
    >
      {error && (
        <Chip variant="shadow" color="danger" className="animate-pulse">
          {error}
        </Chip>
      )}
      <Button
        variant="shadow"
        color="primary"
        size="sm"
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
