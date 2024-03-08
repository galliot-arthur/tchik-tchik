import { badRequestError, forbiddenError } from "@/libs/api/error";
import prisma from "@/libs/database/prisma";

import { ressources } from "@/libs/domain/type/ressources";
import { showed } from "@/libs/domain/type/showed";

import { getSession, Session } from "@auth0/nextjs-auth0";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.newsletters);
  }

  try {
    const body = await request.json();

    const parsedData = showed.parse(body);

    const data = await prisma.showed.create({
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
