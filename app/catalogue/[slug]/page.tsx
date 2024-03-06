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
import { Chip, Image } from "@nextui-org/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { i18n } from "@/libs/i18n/i18n";
import PhotoSwiper from "@/libs/ui/template/PhotoSwiper";

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
    robots: {
      index: true,
    },
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
        {movie.status && (
          <Chip size="sm" className="mt-1">
            {movie.status}
          </Chip>
        )}
        <TchikCardHeader
          {...headerAdapter(movie)}
          subtitle2={i18n.movies.coproduced(movie.coproducedBy)}
          subtitle3={i18n.movies.writtenBy(movie.writtenBy)}
        />

        <ContentContainer>
          <div className="relative w-full pb-2 aspect-[1080/1349] block md:hidden">
            <Image
              radius="none"
              alt={movie.name}
              className="object-cover"
              src={"/quittez-chouchou.jpg"}
            />
          </div>
          <div className="px-4">
            <Typography variant="tiny-bold">{i18n.movies.bio}</Typography>
            <Typography variant="p" className="indent-4">
              {movie.bio}
            </Typography>
          </div>
        </ContentContainer>

        <ContentContainer className="pr-8">
          <SimpleRefCodeDisplayer refCode={movie.staff} />
          <div className="flex flex-row gap-4 mt-4 mb-8">
            <SimpleRefCodeDisplayer
              refCode={movie.diffusion}
              label={i18n.movies.diffusion}
              linkList
              className="w-1/2"
            />
            <SimpleRefCodeDisplayer
              refCode={movie.press}
              label={i18n.movies.press}
              linkList
              className="w-1/2"
            />
          </div>
          {movie.festivals && (
            <>
              <Typography variant="h2" className="mt-4 mb-1">
                {i18n.movies.festivals}
              </Typography>
              <Typography className="text-small mdstyle">
                <MDXRemote source={movie.festivals} />
              </Typography>
            </>
          )}
        </ContentContainer>
        {movie.spoiler && (
          <div>
            <Typography variant="h2" className="mt-4 mb-2 md:mb-0">
              {i18n.movies.spoiler}
            </Typography>
            <div className="relative w-full aspect-[16/9]">
              <iframe
                src={movie.spoiler}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </LeftSection>
      <MiddleSection fullwidth>
        <div className="relative w-full aspect-[1080/1349] hidden md:block">
          <Image
            radius="none"
            alt={movie.name}
            className="object-cover"
            src={"/quittez-chouchou.jpg"}
          />
        </div>
        <div className="max-w-full pb-2">
          <PhotoSwiper />
        </div>
      </MiddleSection>
    </MainContainer>
  );
}
