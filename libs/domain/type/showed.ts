import { z } from "zod";
import { BaseType } from "./ressources";

export const showed = z.object({
  showedId: z.string(),
});

export type ShowedBaseType = z.infer<typeof showed>;

export type ShowedType = ShowedBaseType & BaseType;
