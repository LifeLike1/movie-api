import { z } from "zod";

export const zodParseId = z
  .string()
  .refine((s) => {
    const n = Number(s);

    return Number.isFinite(n) && !Number.isNaN(n) && n > 0 && n % 1 === 0;
  })
  .transform(Number)
  .or(z.number().refine((n) => n > 0 && n % 1 === 0));
