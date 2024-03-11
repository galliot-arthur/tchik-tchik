import { badRequestError, notFoundError } from "@/libs/api/error";
import { getSlug } from "@/libs/api/utils";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { movieType, MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
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

      const parsedData = movieType.parse(body);

      const slug = getSlug(parsedData.name);

      const data = await prisma.movie.create({
        data: {
          ...parsedData,
          slug,
          cover: parsedData.cover ?? "",
          pictures: parsedData.pictures ?? "",
          status: parsedData.status ?? "",
        },
      });

      revalidateTag(ressources.movies);

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
