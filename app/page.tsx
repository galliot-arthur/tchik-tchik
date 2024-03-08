import prisma from "@/libs/database/prisma";
import { getPicture } from "@/libs/domain/type/file";
import { MovieType } from "@/libs/domain/type/movie";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import { i18n } from "@/libs/i18n/i18n";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";
import TchikCard from "@/libs/ui/organism/TchikCard";
import NewsLetterDisplayer from "@/libs/ui/template/NewsLetterDisplayer";
import { notFound } from "next/navigation";

export default async function Home() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });
  const newsletters: NewsletterType[] | undefined =
    await prisma.newsLetter.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });

  if (newsletters === undefined || movies === undefined) {
    return notFound();
  }

  const lastEntry = movies.at(0);

  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{i18n.menu.homepage.label}</Typography>
        <ContentContainer borderTop={false}>
          <Typography variant="tiny-bold" className="mb-2">
            {i18n.bio.label}
          </Typography>
          <Typography
            variant="p"
            className="indent-4 bg-black p-2 rounded"
            color="white"
          >
            {i18n.bio.bio}
          </Typography>
        </ContentContainer>
        <Typography variant="tiny-bold" className="mt-6">
          {i18n.homepage.newsletters}
        </Typography>
        <NewsLetterDisplayer newsletters={newsletters} />
      </LeftSection>
      <MiddleSection>
        {lastEntry && (
          <div>
            <Typography
              variant="tiny-bold"
              className="mb-4 md:mb-2"
              color="black"
            >
              {i18n.homepage.important}
            </Typography>
            <TchikCard
              title={lastEntry.name}
              subtitle={lastEntry.director}
              caption2={lastEntry.kind}
              caption={String(lastEntry.releaseYear)}
              img={{ src: getPicture(lastEntry.cover), alt: lastEntry.name }}
              href={`${i18n.menu.catalog.url}/${lastEntry.slug}`}
            />
          </div>
        )}
      </MiddleSection>
      <RightSection hideOnPhone className="max-h-[16rem] overflow-auto">
        <Typography variant="h2">{i18n.homepage.films}</Typography>
        {movies.map((movie) => (
          <li key={movie.id}>
            <TchikLink
              href={`${i18n.menu.catalog.url}/${movie.slug}`}
              variant="red"
            >
              {movie.name}
            </TchikLink>
          </li>
        ))}
      </RightSection>
    </MainContainer>
  );
}
