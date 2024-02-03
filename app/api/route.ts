import prisma from "@/libs/database/prisma";
import { movieMock } from "@/libs/domain/mock/movies";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  return new NextResponse(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", status: "200" },
  });
}

export async function POST(_: NextRequest) {
  const formatedMovieMock = movieMock.map((movie) => ({
    ...movie,
    slug: slugify(movie.name, { lower: true }),
  }));
  await prisma.movie.deleteMany({});
  const result = await prisma.movie.createMany({ data: formatedMovieMock });
  console.log(result);
  return new NextResponse(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", status: "200" },
  });
}
