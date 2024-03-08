import { z } from "zod";

export const ressourceStruct = z.enum([
  "user",
  "movies",
  "newsletters",
  "files",
  "showed",
]);
export type Ressources = z.infer<typeof ressourceStruct>;

export const ressources: Record<Ressources, Ressources> = {
  user: "user",
  movies: "movies",
  newsletters: "newsletters",
  files: "files",
  showed: "showed",
};

export type BaseType = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export const simpleRefCode = z.object({ label: z.string(), value: z.string() });

export type SimpleRefCode = z.infer<typeof simpleRefCode>;
