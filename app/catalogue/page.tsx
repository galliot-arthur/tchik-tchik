import { fetchData } from "@/libs/api/fetch";
import { MovieType } from "@/libs/domain/type/movie";
import { ressources } from "@/libs/domain/type/ressources";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import { Photogram } from "@/libs/ui/template/Photogram";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: i18n.menu.catalog.label,
  description: i18n.menu.catalog.desc,
  robots: {
    index: true,
  },
  openGraph: {
    title: i18n.menu.catalog.label,
    description: i18n.menu.catalog.desc,
  },
};

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
        {i18n.menu.catalog.desc}
      </div>

      <Photogram movies={movies ?? []} />
    </MainContainer>
  );
}
