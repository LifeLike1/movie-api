import { z } from "zod";

export const createPersonSchema = z.object({
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
  birthDate: z.date({
    required_error: "Birth date is required",
    invalid_type_error: "Birth date must be a date",
  }),
  nationality: z
    .string({
      required_error: "Nationality is required",
      invalid_type_error: "Nationality must be a string",
    })
    .min(1)
    .max(60),
});
