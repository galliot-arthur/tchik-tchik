import {
  badRequestError,
  forbiddenError,
  notFoundError,
} from "@/libs/api/error";
import { getSlug } from "@/libs/api/utils";
import prisma from "@/libs/database/prisma";
import { movieType, MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";

import { getSession, Session } from "@auth0/nextjs-auth0";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.movies);
  }

  const movies: MovieType[] | undefined = await prisma.movie.findMany();

  if (movies === undefined) {
    return notFoundError(ressources.movies);
  }

  return NextResponse.json(JSON.stringify(movies), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.movies);
  }

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

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return badRequestError(ressources.movies);
  }
}
