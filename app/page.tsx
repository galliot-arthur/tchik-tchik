import { fetchData } from "@/libs/api/fetch";
import { getPicture } from "@/libs/domain/type/file";
import { MovieType } from "@/libs/domain/type/movie";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";
import { ShowedType } from "@/libs/domain/type/showed";
import { i18n } from "@/libs/i18n/i18n";
import Card from "@/libs/ui/atoms/Card";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";
import TchikCard from "@/libs/ui/organism/TchikCard";
import NewsLetterDisplayer from "@/libs/ui/template/NewsLetterDisplayer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function Home() {
  const movies = await fetchData<MovieType[]>(ressources.movies);
  const newsletters = await fetchData<NewsletterType[]>(ressources.newsletters);
  const showed = await fetchData<ShowedType[]>(ressources.showed);

  if (
    !newsletters ||
    !movies ||
    !showed ||
    "message" in newsletters ||
    "message" in movies ||
    "message" in showed
  ) {
    return notFound();
  }

  const movieShowed = movies?.find((m) => {
    return m.id === showed?.at(0)?.showedId;
  });

  return (
    <MainContainer>
      <LeftSection>
        <ContentContainer borderTop={false}>
          <Typography variant="h1" className="mb-3">
            {i18n.menu.homepage.label}
          </Typography>
          <Card>
            <ContentContainer borderTop={false} className="md:!mt-2">
              <Typography variant="tiny-bold" className="mb-2">
                {i18n.bio.label}
              </Typography>

              <Typography variant="p">
                <MDXRemote source={i18n.bio.bio} />
              </Typography>
            </ContentContainer>
          </Card>
        </ContentContainer>
        <ContentContainer className="!mt-6" borderTop={false}>
          <Typography variant="tiny-bold" className="md:mt-12">
            {i18n.homepage.newsletters}
          </Typography>
          <NewsLetterDisplayer newsletters={newsletters} />
        </ContentContainer>
      </LeftSection>
      <MiddleSection>
        {movieShowed && (
          <div className="w-full relative">
            <Typography
              variant="tiny-bold"
              className="mb-4 md:mb-2"
              color="black"
            >
              {i18n.homepage.important}
            </Typography>
            <TchikCard
              title={movieShowed.name}
              subtitle={movieShowed.director}
              caption2={movieShowed.kind}
              caption={String(movieShowed.releaseYear)}
              img={{
                src: getPicture(movieShowed.pictures.at(0)?.id),
                alt: movieShowed.name,
              }}
              href={`${i18n.menu.catalog.url}/${movieShowed.slug}`}
            />
          </div>
        )}
      </MiddleSection>
      <RightSection hideOnPhone>
        <Card>
          <Typography variant="h2">{i18n.homepage.films}</Typography>
          {movies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((movie) => (
              <li key={movie.id}>
                <TchikLink
                  href={`${i18n.menu.catalog.url}/${movie.slug}`}
                  variant="red"
                  className="text-sm"
                >
                  {movie.name}
                </TchikLink>
              </li>
            ))}
        </Card>
      </RightSection>
    </MainContainer>
  );
}
