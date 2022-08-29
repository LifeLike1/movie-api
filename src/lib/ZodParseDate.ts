import { z } from "zod";

export const zodParseDate = z
  .preprocess((a) => new Date(z.string().parse(a)), z.date())
  .transform((a) => new Date(a));
