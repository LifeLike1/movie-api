import { z } from "zod";

export const createPersonSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(1)
      .max(60),
    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(1)
      .max(60),
    birthDate: z
      .preprocess((a) => new Date(z.string().parse(a)), z.date())
      .transform((a) => new Date(a)),
    nationality: z
      .string({
        required_error: "Nationality is required",
        invalid_type_error: "Nationality must be a string",
      })
      .min(1)
      .max(60),
    imageUrl: z.string({
      required_error: "Image url is required",
      invalid_type_error: "Image url must be a link",
    }),
  }),
});

const zodId = z.object({
  params: z.object({
    id: z
      .string()
      .refine((s) => {
        const n = Number(s);

        return Number.isFinite(n) && !Number.isNaN(n) && n > 0 && n % 1 === 0;
      })
      .transform(Number),
  }),
});

export const deletePersonSchema = zodId;

export const getSinglePersonSchema = zodId;

export const updateSinglePersonSchema = createPersonSchema.merge(zodId);
