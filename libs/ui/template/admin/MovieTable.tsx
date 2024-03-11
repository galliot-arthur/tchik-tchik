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
  User,
} from "@nextui-org/react";
import { MovieType } from "@/libs/domain/type/movie";
import { Pencil } from "react-bootstrap-icons";
import Link from "next/link";
import DeleteButton from "./components/buttons/DeleteButton";
import { ressources } from "@/libs/domain/type/ressources";
import RessourceTableHeader from "./components/alt/RessourceTableHeader";
import { getPicture } from "@/libs/domain/type/file";
import { i18n } from "@/libs/i18n/i18n";

type Props = { movies: MovieType[] };

export default function MovieTable({ movies }: Props) {
  return (
    <div>
      <RessourceTableHeader
        ressource={ressources.movies}
        addLabel="Ajouter un nouveau film"
      />
      <Table
        aria-label="Example static collection table"
        isStriped
        shadow="none"
      >
        <TableHeader>
          <TableColumn>Film</TableColumn>
          <TableColumn>Crée le</TableColumn>
          <TableColumn>Modifé le</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <Link
                  href={`${i18n.menu.admin.url}/${ressources.movies}/${movie.id}`}
                  className="hover:opacity-50"
                >
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: getPicture(movie.pictures.at(0)?.id),
                    }}
                    name={movie.name}
                    description={movie.director}
                  >
                    {movie.name}
                  </User>
                </Link>
              </TableCell>
              <TableCell>
                {new Date(movie.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                {new Date(movie.updatedAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-0">
                  <Tooltip content="Editer">
                    <Button
                      isIconOnly
                      variant="light"
                      as={Link}
                      href={`${i18n.menu.admin.url}/${ressources.movies}/${movie.id}`}
                      className="text-lg text-black cursor-pointer active:opacity-50"
                    >
                      <Pencil />
                    </Button>
                  </Tooltip>
                  <DeleteButton
                    ressource={ressources.movies}
                    id={movie.id}
                    title={movie.name}
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
