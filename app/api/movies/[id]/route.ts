import { badRequestError, notFoundError } from "@/libs/api/error";
import { getSlug } from "@/libs/api/utils";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { MovieType, movieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const item = await prisma.movie.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.movies);
  }

  return NextResponse.json(item, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return withAutentification(async () => {
    const item = await prisma.movie.findUnique({ where: { id } });

    if (item === undefined) {
      return notFoundError(ressources.movies);
    }

    try {
      const body = await request.json();

      const parsedData = movieType.parse(body);

      const slug = getSlug(parsedData.name);
      const data = await prisma.movie.update({
        where: { id },
        data: {
          ...parsedData,
          cover: parsedData.cover ?? "",
          pictures: parsedData.pictures ?? "",
          status: parsedData.status ?? "",
          slug: getSlug(parsedData.name),
        },
      });

      revalidateTag(ressources.movies);
      revalidatePath(i18n.menu.homepage.url);
      revalidatePath(i18n.menu.catalog.url);
      revalidatePath(`${i18n.menu.catalog.url}/${slug}`);
      revalidatePath(i18n.menu.admin.url);

      return NextResponse.json(data, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.movies);
    }
  }, ressources.movies);
}

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return withAutentification(async () => {
    const item: MovieType = await prisma.movie.findUnique({ where: { id } });

    if (item === undefined) {
      return notFoundError(ressources.movies);
    }

    /* if (item.name !== "test") {
      return NextResponse.json(item, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } */

    try {
      const data: MovieType = await prisma.movie.delete({
        where: { id },
      });

      const movies: MovieType[] = await prisma.movie.findMany();

      const filteredMovie = movies.filter((movie) => movie.index > item.index);

      await Promise.all(
        filteredMovie.map(async (movie: MovieType) =>
          prisma.movie.update({
            where: { id: movie.id },
            data: { ...movie, index: movie.index - 1 },
          })
        )
      );

      revalidateTag(ressources.movies);
      revalidatePath(i18n.menu.homepage.url);
      revalidatePath(i18n.menu.catalog.url);
      revalidatePath(`${i18n.menu.catalog.url}/${item.slug}`);
      revalidatePath(i18n.menu.admin.url);

      return NextResponse.json(data, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.movies);
    }
  }, ressources.movies);
}
