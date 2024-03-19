import { fetchData } from "@/libs/api/fetch";
import { MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import { Photogram } from "@/libs/ui/template/Photogram";
import { notFound } from "next/navigation";

export default async function NosFilms() {
  const movies = await fetchData<MovieType[]>(ressources.movies);

  if (!movies || "message" in movies) {
    return notFound();
  }

  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1" className="md:pb-2">
          {i18n.menu.catalog.label}
        </Typography>
      </LeftSection>
      <div className="md:w-1/2 text-sm hidden md:block">
        En tant que société de production indépendante, nous accompagnons des
        films de fiction et documentaires de jeunes auteurices. Vous trouverez
        ici la liste complète de ces œuvres.
      </div>

      <Photogram movies={movies ?? []} />
    </MainContainer>
  );
}
