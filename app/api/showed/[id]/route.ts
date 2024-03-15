import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return withAutentification(async () => {
    const item = await prisma.showed.findUnique({ where: { id } });

    if (item === undefined) {
      return notFoundError(ressources.showed);
    }

    try {
      const data = await prisma.showed.delete({
        where: { id },
      });

      revalidateTag(ressources.showed);
      revalidatePath(i18n.menu.homepage.url);
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
