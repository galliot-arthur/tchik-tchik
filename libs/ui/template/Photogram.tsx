import classNames from "classnames";
import Image from "next/image";
import TchikCardHeader from "../molecule/TchikCardHeader";
import Link from "next/link";
import { MovieType } from "@/libs/domain/type/movie";
import { headerAdapter } from "@/libs/domain/helpers/movies.adapters";

export function Photogram({ movies }: { movies: MovieType[] }) {
  return (
    <div className={classNames("flex flex-row flex-wrap", "w-full mb-4")}>
      {movies.map((movie, index) => (
        <Item key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}

function Item({ movie, index }: { movie: MovieType; index: number }) {
  return (
    <Link href={`/films/${movie.slug}`} className="w-full md:w-1/2">
      <div
        className={classNames(
          "relative aspect-[16/9]",
          "w-full overflow-hidden photogram"
        )}
      >
        <div
          id="title"
          className={classNames(
            "absolute z-20 transition pointer-events-none",
            "top-[50%] left-[50%]",
            "translate-x-[-50%]",
            "translate-y-[-50%]",
            "hidden md:block"
          )}
        >
          <TchikCardHeader
            {...headerAdapter(movie, true)}
            className="bg-white/80 px-3 py-2"
          />
        </div>
        <Image
          src={`/photogramme/${index}.jpg`}
          fill
          className={classNames(
            "object-cover",
            "md:hover:blur-sm hover:scale-105 hover:opacity-95",
            "transition ease-in-out duration-300"
          )}
          alt="tap"
        />
      </div>
      <TchikCardHeader
        {...headerAdapter(movie, true)}
        className="bg-white/80 px-3 py-2 block md:hidden"
      />
    </Link>
  );
}
