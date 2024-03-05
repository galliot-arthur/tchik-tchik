import {
  badRequestError,
  forbiddenError,
  notFoundError,
} from "@/libs/api/error";
import prisma from "@/libs/database/prisma";
import { newsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.newsletters);
  }

  const item = await prisma.newsLetter.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.newsletters);
  }

  try {
    const body = await request.json();

    const parsedData = newsletterType.parse(body);

    const data = await prisma.newsLetter.update({
      where: { id },
      data: parsedData,
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
    return forbiddenError(ressources.newsletters);
  }

  const item = await prisma.newsLetter.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.newsletters);
  }

  try {
    const data = await prisma.newsLetter.delete({
      where: { id },
    });

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return badRequestError(ressources.newsletters);
  }
}
