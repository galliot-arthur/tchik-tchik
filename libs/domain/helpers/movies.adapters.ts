import { MovieType } from "../type/movie";

export const headerAdapter = (movie?: MovieType, isHomePage?: boolean) => ({
  title: String(isHomePage ? movie?.name : movie?.director),
  subtitle: String(isHomePage ? movie?.director : movie?.kind),
  caption: String(movie?.releaseYear),
  caption2: String(movie?.duration),
});
