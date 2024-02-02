import { MovieType } from "../type/movie";

export const headerAdapter = (movie?: MovieType) => ({
  title: String(movie?.director),
  subtitle: String(movie?.kind),
  caption: String(movie?.releaseYear),
  caption2: String(movie?.duration),
});
