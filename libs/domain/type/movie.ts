import { z } from "zod";

export type BaseType = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export const simpleRefCode = z.object({ label: z.string(), value: z.string() });

export type SimpleRefCode = z.infer<typeof simpleRefCode>;

export const movieKind = ["Documentaire", "Fiction", "Film d'atelier"] as const;

export const movieType = z.object({
  name: z.string(),
  director: z.string(),
  writtenBy: z.string().optional().nullable(),
  duration: z.string(),
  kind: z.enum(movieKind),
  releaseYear: z.number().min(1900),
  bio: z.string(),
  staff: z.array(simpleRefCode),
  coproducedBy: z.string().optional().nullable(),
  sponsor: z.string().optional().nullable(),
  diffusion: z.array(simpleRefCode),
  festivals: z.string().optional().nullable(),
  press: z.array(simpleRefCode),
  spoiler: z.string().optional().nullable(),
});

export type MovieBaseTye = z.infer<typeof movieType>;

export type MovieType = BaseType & MovieBaseTye;
