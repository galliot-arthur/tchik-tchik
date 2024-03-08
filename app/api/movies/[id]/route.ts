import {
  badRequestError,
  forbiddenError,
  notFoundError,
} from "@/libs/api/error";
import prisma from "@/libs/database/prisma";
import { movieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.movies);
  }

  const item = await prisma.movie.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.movies);
  }

  try {
    const body = await request.json();

    const parsedData = movieType.parse(body);

    const data = await prisma.movie.update({
      where: { id },
      data: {
        ...parsedData,
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

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.movies);
  }

  const item = await prisma.movie.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.movies);
  }

  try {
    const data = await prisma.movie.delete({
      where: { id },
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
