import { z } from "zod";
import { BaseType, simpleRefCode } from "./ressources";

export const movieKind = ["Documentaire", "Fiction", "Film d'atelier"] as const;

export const createMovie = z.object({
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
  spoiler: z.string().url().or(z.literal("")).optional(),
  cover: z.string().url().or(z.literal("").optional()).optional(),
  pictures: z.array(z.object({ id: z.string().url() })).min(1),
  status: z.string().optional().nullable(),
});

export const withIndex = z.object({
  index: z.number(),
});

export const movieType = createMovie.merge(withIndex);

export type MovieBaseType = z.infer<typeof movieType>;

export type MovieType = BaseType & MovieBaseType;

export const movieOrder = z.object({
  current: z.string(),
  next: z.string(),
});

export type MovieOrder = z.infer<typeof movieOrder>;
