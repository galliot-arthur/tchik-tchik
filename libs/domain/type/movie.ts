export type BaseType = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type SimpleRefCode = { label: string; value: string };

export type MovieBaseTye = {
  name: string;
  director: string;
  writtenBy?: string;
  duration: string;
  kind: "Documentaire" | "Fiction" | "Film d'atelier";
  releaseYear: number;
  bio: string;
  staff: SimpleRefCode[];
  coproducedBy?: string;
  sponsor?: string;
  diffusion: SimpleRefCode[];
  festivals?: string;
  press: SimpleRefCode[];
  spoiler?: string;
};

export type MovieType = BaseType & MovieBaseTye;
