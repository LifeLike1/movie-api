import { z } from "zod";
import { zodParseId } from "@/lib/ZodParseId";
import { zodParseDate } from "@/lib/ZodParseDate";

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
      .max(80),
    birthDate: zodParseDate,
    nationality: z
      .string({
        required_error: "Nationality is required",
        invalid_type_error: "Nationality must be a string",
      })
      .min(1)
      .max(56),
    imageUrl: z.string({
      required_error: "Image url is required",
      invalid_type_error: "Image url must be a link",
    }),
  }),
});

const zodIdInParams = z.object({
  params: z.object({
    id: zodParseId,
  }),
});

export const deletePersonSchema = zodIdInParams;

export const getSinglePersonSchema = zodIdInParams;

export const updateSinglePersonSchema = createPersonSchema.merge(zodIdInParams);
