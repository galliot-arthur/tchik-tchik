import { z } from "zod";
import { BaseType } from "./ressources";

export const newsletterType = z.object({
  title: z.string(),
  content: z.string(),
  coverId: z.string().optional().nullable(),
});

export type NewsletterBaseType = z.infer<typeof newsletterType>;

export type NewsletterType = BaseType & NewsletterBaseType;
