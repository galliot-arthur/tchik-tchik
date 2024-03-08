import { z } from "zod";

export const showed = z.object({
  showedId: z.string(),
});

export type ShowedType = z.infer<typeof showed>;
