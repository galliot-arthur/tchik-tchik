import { headerAdapter } from "@/libs/domain/helpers/movies.adapters";
import { MovieType } from "@/libs/domain/type/movie";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import TchikCardHeader from "@/libs/ui/molecule/TchikCardHeader";
import SimpleRefCodeDisplayer from "@/libs/ui/template/SimpleRefCodeDisplayer";
import { Chip } from "@nextui-org/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { i18n } from "@/libs/i18n/i18n";
import PhotoSwiper from "@/libs/ui/template/PhotoSwiper";
import { getPicture } from "@/libs/domain/type/file";
import Card from "@/libs/ui/atoms/Card";
import { fetchData, fetchFromSlug } from "@/libs/api/fetch";
import { ressources } from "@/libs/domain/type/ressources";
import Image from "next/image";

export async function generateStaticParams() {
  const movies = await fetchData<MovieType[]>(ressources.movies);

  if (!movies || "message" in movies) {
    notFound();
  }

  return movies.map((movie) => movie.slug);
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const movie = await fetchFromSlug<MovieType>(ressources.movies, slug);

  if (!movie || "message" in movie) {
    notFound();
  }

  const meta: Metadata = {
    title: movie.name,
    description: movie.bio,
    robots: {
      index: true,
    },
    openGraph: {
      title: movie.name,
      description: movie.bio,
      type: "website",
      images: [getPicture(movie.cover || movie.pictures.at(0)?.id)],
    },
  };

  return meta;
}

export default async function Film({ params: { slug } }: Props) {
  const movie = await fetchFromSlug<MovieType>(ressources.movies, slug);

  if (!movie || "message" in movie) {
    notFound();
  }

  return (
    <MainContainer>
      <LeftSection>
        <Card>
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
        </Card>
        {movie.cover && (
          <div className="relative w-full mt-4 aspect-[480/679] block md:hidden tchik-shadow">
            <Image
              alt={movie.name}
              fill
              className="object-cover"
              src={getPicture(movie.cover)}
            />
          </div>
        )}
        <ContentContainer borderTop={false} className="pt-4">
          <div className="px-4">
            <Typography variant="tiny-bold">{i18n.movies.bio}</Typography>
            <Typography variant="p">{movie.bio}</Typography>
          </div>
        </ContentContainer>
        <ContentContainer className="md:pr-8 pt-4">
          <SimpleRefCodeDisplayer refCode={movie.staff} className="mx-2" />
          <div className="flex flex-row gap-4 mt-2 md:mt-4 mb-4 md:mb-8 mx-2">
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
            <Card>
              <Typography
                variant="h2"
                className="mb-1 !text-base text-gray-500"
              >
                {i18n.movies.festivals}
              </Typography>
              <Typography className="text-small mdstyle">
                <MDXRemote source={movie.festivals} />
              </Typography>
            </Card>
          )}
        </ContentContainer>
      </LeftSection>
      <MiddleSection fullwidth className="ml-auto">
        {movie.cover && (
          <a
            className="relative w-full aspect-[480/679] hidden md:block tchik-shadow"
            href={getPicture(movie.cover)}
            target="_blank"
          >
            <Image
              alt={movie.name}
              fill
              className="object-cover"
              src={getPicture(movie.cover)}
            />
          </a>
        )}
        <div className="max-w-full w-full my-2 md:my-0">
          <PhotoSwiper pictures={movie.pictures} />
        </div>
        {movie.spoiler && (
          <div className="w-full mt-2 md:mt-0 mb-4">
            <Typography className="text-xs mb-2 md:mb-1 text-gray-500">
              {i18n.movies.spoiler}
            </Typography>
            <div className="relative w-full aspect-[16/9]">
              <iframe
                title="vimeo"
                src={movie.spoiler}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </MiddleSection>
    </MainContainer>
  );
}
