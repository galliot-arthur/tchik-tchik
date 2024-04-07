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
import { ArrowDownCircle, ArrowUpCircle, Pencil } from "react-bootstrap-icons";
import Link from "next/link";
import DeleteButton from "./components/buttons/DeleteButton";
import { ressources } from "@/libs/domain/type/ressources";
import RessourceTableHeader from "./components/alt/RessourceTableHeader";
import { getPicture } from "@/libs/domain/type/file";
import { i18n } from "@/libs/i18n/i18n";
import { useFieldArray, useForm } from "react-hook-form";
import { post } from "@/libs/api/fetch";
import { useEffect, useState } from "react";
import classNames from "classnames";

type Props = { movies: MovieType[] };

export default function MovieTable({ movies }: Props) {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { control, getValues, reset } = useForm<{ movies: MovieType[] }>({
    defaultValues: { movies: movies.sort((a, b) => a.index - b.index) },
  });

  const { fields } = useFieldArray({
    control,
    name: "movies",
  });

  const submit = async (index: number, to: number) => {
    setIsLoading(true);

    const current = getValues(`movies.${index}.id`);
    const next = getValues(`movies.${to}.id`);

    if (!current || !next) {
      setError("not found");
      throw new Error();
    }

    try {
      await post({ next, current }, "movies/order").then((e) => {
        if ("message" in e) {
          setError(e.message);
          throw new Error();
        }
        reset({ movies: e as any });
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getId = (index: number) => getValues(`movies.${index}.id`);

  useEffect(() => {
    const setter = () => setTimeout(() => setError(undefined), 5000);

    const id = error ? setter() : 0;

    return () => clearTimeout(id);
  }, [error, setError]);

  return (
    <div>
      <RessourceTableHeader
        ressource={ressources.movies}
        addLabel="Ajouter un nouveau film"
        error={error}
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
          <TableColumn>Index</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          className={classNames(isLoading && "animate-pulse")}
        >
          {fields.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>
                <Link
                  href={`${i18n.menu.admin.url}/${ressources.movies}/${getId(
                    index
                  )}`}
                  className="hover:opacity-50"
                >
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: getPicture(movie?.pictures?.at(0)?.id),
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
                      href={`${i18n.menu.admin.url}/${
                        ressources.movies
                      }/${getId(index)}`}
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
              <TableCell>
                <div className="relative flex items-center gap-0">
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-lg text-black cursor-pointer active:opacity-50"
                    onClick={() => submit(index, index - 1)}
                    isDisabled={index === 0 || isLoading}
                  >
                    <ArrowUpCircle />
                  </Button>
                  {index + 1}
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-lg text-black cursor-pointer active:opacity-50"
                    onClick={() => submit(index, index + 1)}
                    isDisabled={index === fields.length - 1 || isLoading}
                  >
                    <ArrowDownCircle />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
