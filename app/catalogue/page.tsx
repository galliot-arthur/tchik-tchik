import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/domain/type/movie";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import { Photogram } from "@/libs/ui/template/Photogram";

export default async function NosFilms() {
  const movies: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{i18n.menu.catalog.label}</Typography>
      </LeftSection>
      <Photogram movies={movies ?? []} />
    </MainContainer>
  );
}
