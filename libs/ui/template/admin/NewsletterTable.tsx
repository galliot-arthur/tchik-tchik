"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

import { Pencil } from "react-bootstrap-icons";
import Link from "next/link";
import DeleteButton from "./components/buttons/DeleteButton";
import { ressources } from "@/libs/domain/type/ressources";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import RessourceTableHeader from "./components/alt/RessourceTableHeader";
import { i18n } from "@/libs/i18n/i18n";

type Props = { newsletters: NewsletterType[] };

export default function NewsletterTable({ newsletters }: Props) {
  return (
    <div>
      <RessourceTableHeader
        ressource={ressources.newsletters}
        addLabel="Ajouter une newsletter"
      />
      <Table
        aria-label="Example static collection table"
        isStriped
        shadow="none"
      >
        <TableHeader>
          <TableColumn>Titre</TableColumn>
          <TableColumn>Crée le</TableColumn>
          <TableColumn>Modifé le</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {newsletters.map((newsletter) => (
            <TableRow key={newsletter.id}>
              <TableCell>
                <Link
                  href={`${i18n.menu.admin.url}/${ressources.newsletters}/${newsletter.id}`}
                  className="hover:opacity-50"
                >
                  {newsletter.title}
                </Link>
              </TableCell>
              <TableCell>
                {new Date(newsletter.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                {new Date(newsletter.updatedAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-0">
                  <Tooltip content="Editer">
                    <Button
                      isIconOnly
                      variant="light"
                      as={Link}
                      href={`${i18n.menu.admin.url}/${ressources.newsletters}/${newsletter.id}`}
                      className="text-lg text-black cursor-pointer active:opacity-50"
                    >
                      <Pencil />
                    </Button>
                  </Tooltip>
                  <DeleteButton
                    ressource={ressources.newsletters}
                    id={newsletter.id}
                    title={newsletter.title}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
