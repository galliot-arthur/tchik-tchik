import { MovieType } from "@/libs/domain/type/movie";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";

import { Session, getSession } from "@auth0/nextjs-auth0";

import { notFound, redirect } from "next/navigation";
import MovieTable from "../../libs/ui/template/admin/MovieTable";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import NewsletterTable from "@/libs/ui/template/admin/NewsletterTable";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import TabDisplayer from "@/libs/ui/atoms/TabDisplayer";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import { ShowedType } from "@/libs/domain/type/showed";
import { fetchData } from "@/libs/api/fetch";
import { ressources } from "@/libs/domain/type/ressources";
import { ENV_TYPE } from "../env";
import Showed from "@/libs/ui/template/admin/Showed";

export default async function Admin() {
  const session = await getSession();

  if (
    ENV_TYPE === "prod" &&
    (!(session instanceof Session) || !("user" in session))
  ) {
    return redirect("/api/auth/login");
  }

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

  const lastShowed = showed[0];

  return (
    <main className="relative top-16 mb-8">
      <AdminTitleContainer hideGoback>
        <Typography variant="h1">{i18n.menu.admin.label}</Typography>
        <Typography variant="tiny-bold">
          {i18n.admin.homePage.welcome(session?.user.name)}
        </Typography>
        <TchikLink href="/api/auth/logout">
          {i18n.admin.homePage.logout}
        </TchikLink>
      </AdminTitleContainer>
      <ContentContainer>
        <TabDisplayer
          items={[
            { title: "Films", children: <MovieTable movies={movies} /> },
            {
              title: "Newsletter",

              children: <NewsletterTable newsletters={newsletters} />,
            },
            {
              title: "A la une",
              children: <Showed movies={movies} defaultValues={lastShowed} />,
            },
          ]}
        />
      </ContentContainer>
    </main>
  );
}
