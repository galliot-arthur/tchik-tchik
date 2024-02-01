import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/domain/type/movie";
import { i18n } from "@/libs/i18n/i18n";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";
import TchikCard from "@/libs/ui/organism/TchikCard";
import { Photogram } from "@/libs/ui/template/Photogram";

export default async function Home() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany();

  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{i18n.menu.homepage}</Typography>
        <ContentContainer>
          <Typography variant="tiny-bold" className="mb-2">
            {i18n.bio.label}
          </Typography>
          <Typography variant="p">{i18n.bio.bio}</Typography>
        </ContentContainer>
      </LeftSection>
      <MiddleSection>
        <Typography variant="h2" className="text-end md:hidden block">
          {i18n.homepage.newsletters}
        </Typography>
        <TchikCard
          key={movies?.at(0)?.id}
          img={{ alt: movies?.at(0)?.name ?? "", src: "/quittez-chouchou.jpg" }}
          title={movies?.at(0)?.name ?? ""}
          subtitle={movies?.at(0)?.director ?? ""}
          caption={new Date(movies?.at(0)?.releasedAt ?? "").toLocaleDateString(
            "fr-FR"
          )}
          href={`/films/${movies?.at(0)?.id}`}
        />
        <Typography variant="h2" className="text-end hidden md:block">
          {i18n.homepage.newsletters}
        </Typography>
      </MiddleSection>
      <RightSection hideOnPhone>
        {movies?.map((movie) => (
          <li key={movie.id}>
            <TchikLink href={`/films/${movie.id}`} variant="red">
              {movie.name}
            </TchikLink>
          </li>
        ))}
      </RightSection>
      <Typography variant="h2">{i18n.homepage.films}</Typography>
      <Photogram movies={movies ?? []} />
    </MainContainer>
  );
}
