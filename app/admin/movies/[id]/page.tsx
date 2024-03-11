import { fetchData } from "@/libs/api/fetch";
import { MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import MovieForm from "@/libs/ui/template/admin/MovieForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const movies = await fetchData<MovieType[]>(ressources.movies);

  if ("message" in movies) {
    notFound();
  }

  return movies.map((movie) => movie.id);
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie = await fetchData<MovieType>(ressources.movies, id);

  if ("message" in movie) {
    notFound();
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
  const movie = await fetchData<MovieType>(ressources.movies, id);

  if ("message" in movie) {
    notFound();
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
