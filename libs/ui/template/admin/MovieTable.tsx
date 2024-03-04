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
import { Pencil, PlusCircle } from "react-bootstrap-icons";
import Link from "next/link";
import DeleteButton from "./components/buttons/DeleteButton";
import ressources from "@/libs/domain/type/ressources";

type Props = { movies: MovieType[] };

export default function MovieTable({ movies }: Props) {
  return (
    <div>
      <div className="flex flex-row justify-end pb-2">
        <Tooltip content="Editer">
          <Button
            variant="light"
            size="sm"
            as={Link}
            href={`/admin/movie`}
            className="text-lg text-black cursor-pointer active:opacity-50"
            startContent={<PlusCircle />}
          >
            Ajouter un nouveau film
          </Button>
        </Tooltip>
      </div>
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
                  href={`/admin/movie/${movie.id}`}
                  className="hover:opacity-50"
                >
                  <User
                    avatarProps={{ radius: "lg", src: "/quittez-chouchou.jpg" }}
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
                      href={`/admin/movie/${movie.id}`}
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
