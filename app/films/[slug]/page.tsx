import prisma from "@/libs/database/prisma";
import { headerAdapter } from "@/libs/domain/helpers/movies.adapters";
import { MovieType } from "@/libs/domain/type/movie";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import TchikCardHeader from "@/libs/ui/molecule/TchikCardHeader";
import SimpleRefCodeDisplayer from "@/libs/ui/template/SimpleRefCodeDisplayer";
import { Image } from "@nextui-org/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { i18n } from "@/libs/i18n/i18n";

export async function generateStaticParams() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany();
  if (!movies) {
    return notFound();
  }
  return movies.map((movie) => movie.slug);
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const movie: MovieType | undefined = await prisma.movie.findUnique({
    where: { slug: slug },
  });

  if (!movie) {
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
    where: { slug: slug },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{movie.name}</Typography>
        <TchikCardHeader
          {...headerAdapter(movie)}
          subtitle2={
            movie.coproducedBy
              ? `Une coproduction ${movie.coproducedBy}`
              : undefined
          }
        />

        <ContentContainer>
          <Typography variant="tiny-bold" className="mb-2">
            {i18n.movies.bio}
          </Typography>
          <Typography variant="p" className="indent-4">
            {movie.bio}
          </Typography>
        </ContentContainer>
        <ContentContainer>
          {movie.writtenBy && (
            <Typography className="text-tiny uppercase font-bold">
              {movie.writtenBy}
            </Typography>
          )}
          <SimpleRefCodeDisplayer refCode={movie.staff} label="Staff" />
          <SimpleRefCodeDisplayer
            refCode={movie.diffusion}
            label="Diffusion"
            linkList
          />
          {movie.festivals && (
            <>
              <Typography variant="h2" className="mt-4">
                {"Participation à des festivals"}
              </Typography>
              {movie.festivals.split("\\n").map((f) => (
                <Typography key={f} className="text-small">
                  <MDXRemote source={f} />
                </Typography>
              ))}
            </>
          )}
          <SimpleRefCodeDisplayer
            refCode={movie.press}
            label="Presse"
            linkList
          />
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
