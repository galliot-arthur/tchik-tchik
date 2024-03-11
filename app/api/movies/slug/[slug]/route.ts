import { notFoundError } from "@/libs/api/error";
import prisma from "@/libs/database/prisma";
import { ressources } from "@/libs/domain/type/ressources";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const item = await prisma.movie.findUnique({ where: { slug } });

  if (item === undefined) {
    return notFoundError(ressources.movies);
  }

  return NextResponse.json(item, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
