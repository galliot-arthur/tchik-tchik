import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/domain/type/movie";
import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import MovieForm from "@/libs/ui/template/admin/MovieForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany();
  if (!movies) {
    return notFound();
  }
  return movies.map((movie) => movie.id);
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie: MovieType | undefined = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    return notFound();
  }

  return {
    title: movie.name,
    description: movie.bio,
    robots: {
      index: false,
    },
  };
}

export default async function EditMovie({ params: { id } }: Props) {
  const movie: MovieType | undefined = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{"Edit"}</Typography>
        <Typography variant="h2">{movie.name}</Typography>
      </AdminTitleContainer>
      <MovieForm defaultValues={movie} />
    </div>
  );
}
