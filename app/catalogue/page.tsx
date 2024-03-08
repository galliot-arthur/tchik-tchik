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
        <Typography variant="h1" className="border-b-2 border-bl pb-2">
          {i18n.menu.catalog.label}
        </Typography>
      </LeftSection>
      <div className="md:w-1/2">
        En tant que société de production indépendante, nous accompagnons des
        films de fiction et documentaires de jeunes auteurices. Vous trouverez
        ici la liste complète de ces œuvres.
      </div>

      <Photogram movies={movies ?? []} />
    </MainContainer>
  );
}
