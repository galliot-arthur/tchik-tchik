import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/entities/movie";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import TchikCardHeader from "@/libs/ui/molecule/TchikCardHeader";
import { Image } from "@nextui-org/react";
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
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const movie: MovieType | undefined = await prisma.movie.findUnique({
    where: { id: slug },
  });

  if (movie === undefined) {
    return notFound();
  }

  return {
    title: movie.name,
    description: movie.bio,
    /* robots: {
        index: titre === 'La Nostalgie Des Blattes',
      }, */
    openGraph: {
      title: movie.name,
      description: movie.bio,
      type: "website",
      //images: [API_URL + photo_couverture],
    },
  };
}

export default async function Film({ params: { slug } }: Props) {
  const movie: MovieType | undefined = await prisma.movie.findUnique({
    where: { id: slug },
  });

  if (movie === undefined) {
    return notFound();
  }

  return (
    <main className="flex relative top-[3rem] flex-col sm:flex-row">
      <LeftSection>
        <Typography variant="h1">{movie.name}</Typography>
        <TchikCardHeader
          title={movie.director}
          subtitle={movie.duration}
          caption={new Date(movie.releasedAt).toLocaleDateString("fr-FR")}
        />
        <p>{movie.bio}</p>
      </LeftSection>
      <MiddleSection fullwidth>
        <div className="relative h-full aspect-[1080/1349]">
          <Image
            radius="none"
            alt={movie.name}
            className="object-cover"
            src={"/quittez-chouchou.jpg"}
          />
        </div>
      </MiddleSection>
    </main>
  );
}
