import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/domain/type/movie";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
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
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{movie.name}</Typography>
        <TchikCardHeader
          title={movie.director}
          subtitle={movie.duration}
          caption={String(new Date(movie.releasedAt).getFullYear())}
        />
        <ContentContainer>
          <p>{movie.bio}</p>
        </ContentContainer>
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
    </MainContainer>
  );
}
