"use client";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import TchikCardHeader from "../molecule/TchikCardHeader";
import Link from "next/link";
import { MovieType } from "@/libs/domain/type/movie";

export function Photogram({ movies }: { movies: MovieType[] }) {
  return (
    <div className={classNames("flex flex-row flex-wrap", "w-full")}>
      {movies.map((movie, index) => (
        <Item key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}

function Item({ movie, index }: { movie: MovieType; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={`/films/${movie.id}`}
      className="w-full md:w-1/2"
    >
      <div
        className={classNames(
          "relative aspect-[16/9]",
          "w-full overflow-hidden"
        )}
      >
        <div
          className={classNames(
            "absolute z-20 transition pointer-events-none",
            "top-[50%] left-[50%]",
            "translate-x-[-50%]",
            "translate-y-[-50%]",
            hover ? "opacity-100" : "opacity-0"
          )}
        >
          <TchikCardHeader
            title={movie.name}
            subtitle={movie.director}
            caption={String(new Date(movie.releasedAt).getFullYear())}
            className="bg-white/80 px-3 py-2"
          />
        </div>
        <Image
          src={`/photogramme/${index}.jpg`}
          fill
          className={classNames(
            "object-cover",
            " hover:blur-sm hover:scale-105 hover:opacity-95",
            "transition ease-in-out duration-300"
          )}
          alt="tap"
        />
      </div>
      <TchikCardHeader
        title={movie.name}
        subtitle={movie.director}
        caption={String(new Date(movie.releasedAt).getFullYear())}
        className="bg-white/80 px-3 py-2 block md:hidden"
      />
    </Link>
  );
}
