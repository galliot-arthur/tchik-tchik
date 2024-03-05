import {
  badRequestError,
  forbiddenError,
  notFoundError,
} from "@/libs/api/error";
import prisma from "@/libs/database/prisma";
import { newsletterType, NewsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";

import { getSession, Session } from "@auth0/nextjs-auth0";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.newsletters);
  }

  const newsLetters: NewsletterType[] | undefined =
    await prisma.newsLetter.findMany();

  if (newsLetters === undefined) {
    return notFoundError(ressources.newsletters);
  }

  return NextResponse.json(JSON.stringify(newsLetters), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.newsletters);
  }

  try {
    const body = await request.json();

    const parsedData = newsletterType.parse(body);

    const data = await prisma.newsLetter.create({
      data: {
        ...parsedData,
      },
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
