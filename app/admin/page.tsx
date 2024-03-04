import { MovieType } from "@/libs/domain/type/movie";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";

import { Session, getSession } from "@auth0/nextjs-auth0";

import { notFound, redirect } from "next/navigation";
import MovieTable from "../../libs/ui/template/admin/MovieTable";
import prisma from "@/libs/database/prisma";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";

export default async function Admin() {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return redirect("/api/auth/login");
  }

  const data: MovieType[] | undefined = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (data === undefined) {
    return notFound();
  }

  return (
    <main className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{i18n.menu.admin.label}</Typography>
        <Typography variant="tiny-bold">
          {i18n.admin.homePage.welcome(session.user.name)}
        </Typography>
      </AdminTitleContainer>
      <ContentContainer>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <MovieTable movies={data} />
          </div>
        </div>
      </ContentContainer>
    </main>
  );
}
