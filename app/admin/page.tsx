import { MovieType } from "@/libs/domain/type/movie";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";

import { Session, getSession } from "@auth0/nextjs-auth0";

import { notFound, redirect } from "next/navigation";
import MovieTable from "../../libs/ui/template/admin/MovieTable";
import prisma from "@/libs/database/prisma";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import NewsletterTable from "@/libs/ui/template/admin/NewsletterTable";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import TabDisplayer from "@/libs/ui/atoms/TabDisplayer";
import TchikLink from "@/libs/ui/atoms/TchikLink";

export default async function Admin() {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return redirect("/api/auth/login");
  }

  const movies: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });
  const newsletters: NewsletterType[] | undefined =
    await prisma.newsLetter.findMany({
      orderBy: { createdAt: "desc" },
    });

  if (movies === undefined || newsletters === undefined) {
    return notFound();
  }

  return (
    <main className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{i18n.menu.admin.label}</Typography>
        <Typography variant="tiny-bold">
          {i18n.admin.homePage.welcome(session.user.name)}
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
          ]}
        />
      </ContentContainer>
    </main>
  );
}
