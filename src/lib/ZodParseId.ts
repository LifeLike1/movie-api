import { z } from "zod";

export const zodParseId = (key: string = "id") =>
  z
    .string({
      required_error: `${key} is required`,
      invalid_type_error: `${key} is invalid`,
    })
    .refine((s) => {
      const n = Number(s);

      return Number.isFinite(n) && !Number.isNaN(n) && n > 0 && n % 1 === 0;
    })
    .transform(Number)
    .or(
      z
        .number({
          required_error: `${key} is required`,
          invalid_type_error: `${key} is invalid`,
        })
        .refine((n) => n > 0 && n % 1 === 0)
    );
