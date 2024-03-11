import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import prisma from "@/libs/database/prisma";
import { newsletterType, NewsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const newsLetters: NewsletterType[] | undefined =
    await prisma.newsLetter.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

  if (newsLetters === undefined) {
    return notFoundError(ressources.newsletters);
  }

  return NextResponse.json(newsLetters, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      const body = await request.json();

      const parsedData = newsletterType.parse(body);

      const data = await prisma.newsLetter.create({
        data: {
          ...parsedData,
        },
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
