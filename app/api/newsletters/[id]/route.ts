import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { newsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const item = await prisma.newsLetter.findUnique({ where: { id } });

  if (item === undefined) {
    return notFoundError(ressources.newsletters);
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

      revalidateTag(ressources.newsletters);
      revalidatePath(i18n.menu.homepage.url);
      revalidatePath(i18n.menu.admin.url);
      revalidatePath(i18n.menu.admin.url + "/newsletters/" + id);

      return NextResponse.json(data, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.movies);
    }
  }, ressources.newsletters);
}

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return withAutentification(async () => {
    const item = await prisma.newsLetter.findUnique({ where: { id } });

    if (item === undefined) {
      return notFoundError(ressources.newsletters);
    }

    try {
      const data = await prisma.newsLetter.delete({
        where: { id },
      });

      revalidateTag(ressources.newsletters);

      return NextResponse.json(data, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.newsletters);
    }
  }, ressources.newsletters);
}
