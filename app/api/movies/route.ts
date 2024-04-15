import { badRequestError, notFoundError } from "@/libs/api/error";
import { getSlug } from "@/libs/api/utils";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { createMovie, MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { index: "asc" },
  });

  if (movies === undefined) {
    return notFoundError(ressources.movies);
  }

  return NextResponse.json(movies, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      const body = await request.json();
      const parsedData = createMovie.parse(body);

      const slug = getSlug(parsedData.name);

      const movies = await prisma.movie.findMany();

      await Promise.all(
        movies.map(async (movie: MovieType) =>
          prisma.movie.update({
            where: { id: movie.id },
            data: { ...movie, index: movie.index + 1 },
          })
        )
      );

      const data = await prisma.movie.create({
        data: {
          ...parsedData,
          index: 1,
          slug,
          cover: parsedData.cover ?? "",
          pictures: parsedData.pictures ?? "",
          status: parsedData.status ?? "",
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
