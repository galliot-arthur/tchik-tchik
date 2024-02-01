export type BaseType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type MovieType = BaseType & {
  director: string;
  writtenBy: string;
  duration: string;
  kind: "Documentaire" | "Fiction" | "Film d'atelier";
  releasedAt: Date;
  bio: string;
  staff: { label: string; content: string }[];
  coproducedBy?: string;
  sponsor?: string;
  diffusion?: string;
  festivals?: string;
  press: { label: string; content: string }[];
  spoiler?: string;
};
