import prisma from "@/libs/database/prisma";
import { MovieType } from "@/libs/entities/movie";
import { UserType } from "@/libs/entities/user";
import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import TchikCard from "@/libs/ui/organism/TchikCard";
import Link from "next/link";

export default async function Home() {
  const users: UserType[] | undefined = await prisma.user.findMany();
  const movies: MovieType[] | undefined = await prisma.movie.findMany();

  return (
    <main className="flex relative top-[3rem] flex-col sm:flex-row">
      <LeftSection>
        <Typography variant="h1">{i18n.menu.homepage}</Typography>
        <Typography variant="p2">{i18n.bio}</Typography>
      </LeftSection>
      <MiddleSection>
        <Typography variant="h2">{i18n.homepage.films}</Typography>
        {movies?.map((item) => (
          <TchikCard
            key={item.id}
            img={{ alt: item.name, src: "/quittez-chouchou.jpg" }}
            title={item.name}
            subtitle={item.director}
            caption={new Date(item.releasedAt).toLocaleDateString("fr-FR")}
            href={item.id}
          />
        ))}
      </MiddleSection>
      <section className="hidden sm:block sm:w-1/4 text-end p-[1rem]">
        <ul className="pl-3 py-2 border-t-2 border-gray-500">
          {movies?.map((movie) => (
            <li key={movie.id}>
              <Link href={movie.name} className="hover-underline">
                {movie.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
