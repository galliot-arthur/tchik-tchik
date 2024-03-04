import { Infer, array, date, enums, object, string } from "superstruct";

export const ressourceStruct = enums(["user", "movies", "newsletter"]);
export type Ressources = Infer<typeof ressourceStruct>;

const ressources: Record<Ressources, Ressources> = {
  user: "user",
  movies: "movies",
  newsletter: "newsletter",
};

export const revalidateRessourceBody = object({
  ressources: array(ressourceStruct),
});

export type RevalidateRessourcesBody = Infer<typeof revalidateRessourceBody>;

export default ressources;

export const commonRessourceStruct = object({
  id: string(),
  updatedAt: date(),
  createdAt: date(),
  titre: string(),
  slug: string(),
});

export type CommonRessourceType = Infer<typeof commonRessourceStruct>;

export const commonRessourceUpdate = object({
  id: string(),
  updatedAt: string(),
  createdAt: string(),
  titre: string(),
  slug: string(),
});

export type CommonRessourceUpdate = Infer<typeof commonRessourceUpdate>;

export const commonRessourcePost = object({
  titre: string(),
});
