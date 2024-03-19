import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { MovieType, movieOrder } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      const body = await request.json();

      const parsedData = movieOrder.parse(body);

      const current: MovieType | undefined = await prisma.movie.findUnique({
        where: { id: parsedData.current },
      });
      const next: MovieType | undefined = await prisma.movie.findUnique({
        where: { id: parsedData.next },
      });

      if (!current || !next) {
        return notFoundError(
          ressources.movies + "_" + current?.name + next?.name
        );
      }

      await prisma.movie.update({
        where: { id: current.id },
        data: { index: next.index },
      });
      await prisma.movie.update({
        where: { id: next.id },
        data: { index: current.index },
      });

      revalidateTag(ressources.movies);
      revalidatePath(i18n.menu.homepage.url);
      revalidatePath(i18n.menu.catalog.url);
      revalidatePath(i18n.menu.admin.url);

      const movies: MovieType[] = await prisma.movie.findMany({
        orderBy: { index: "asc" },
      });

      return NextResponse.json(movies, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.movies);
    }
  }, ressources.movies);
}
