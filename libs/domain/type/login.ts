import { z } from "zod";

export const login = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(16),
});

export type Login = z.infer<typeof login>;
