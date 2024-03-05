import { z } from "zod";
import { BaseType } from "./ressources";

export const newsletterType = z.object({
  title: z.string(),
  content: z.string(),
});

export type NewsletterBaseType = z.infer<typeof newsletterType>;

export type NewsletterType = BaseType & NewsletterBaseType;
