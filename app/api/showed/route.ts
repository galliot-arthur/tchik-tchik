import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { ressources } from "@/libs/domain/type/ressources";
import { showed, ShowedType } from "@/libs/domain/type/showed";
import { i18n } from "@/libs/i18n/i18n";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const showed: ShowedType[] | undefined = await prisma.showed.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (showed === undefined) {
    return notFoundError(ressources.newsletters);
  }

  return NextResponse.json(showed, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      const body = await request.json();

      const parsedData = showed.parse(body);

      const data = await prisma.showed.create({
        data: {
          ...parsedData,
        },
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
      return badRequestError(ressources.newsletters);
    }
  }, ressources.showed);
}
