import { zodParseId } from "@/lib/ZodParseId";
import { zodParseDate } from "@/lib/ZodParseDate";
import { z } from "zod";

const movieSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1)
    .max(150),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1)
    .max(500),
  rating: z
    .string({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be in the range 1-5",
    })
    .refine((s) => {
      const n = Number(s);

      return Number.isFinite(n) && !Number.isNaN(n) && n > 0 && n <= 5;
    })
    .transform((x) => Number(x).toFixed(2))
    .or(
      z
        .number({
          required_error: "Rating is required",
          invalid_type_error: "Rating must be in the range 1-5",
        })
        .refine((n) => n > 0 && n <= 5)
        .transform((x) => x.toFixed(2))
    ),
  releaseDate: zodParseDate,
  imageUrl: z
    .string({
      required_error: "ImageUrl is required",
      invalid_type_error: "ImageUrl must be a string",
    })
    .min(1)
    .max(500)
    .refine((s) => {
      const urlRegexExpression =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      const regex = new RegExp(urlRegexExpression);
      return s.match(regex);
    }),
  directorId: zodParseId("directorId").optional(),
});

export const createMovieSchema = z.object({
  body: movieSchema,
});

const zodIdInParams = z.object({
  params: z.object({
    id: zodParseId(),
  }),
});

const zodIdInBodyDirector = z.object({
  body: z.object({
    directorId: zodParseId("directorId"),
  }),
});

const zodIdInParamsMovie = z.object({
  params: z.object({ movieId: zodParseId("movieId") }),
});

const zodIdInBodyActor = z.object({
  body: z.object({
    personId: zodParseId("actorId"),
  }),
});

const movieKeys = z.enum(
  [...movieSchema.keyof()._def.values, "createdAt, updatedAt"],
  {
    required_error: "Invalid sort key",
    invalid_type_error: `Possible keys are: ${
      (movieSchema.keyof()._def.values.join(", "), "createdAt, updatedAt")
    }`,
  }
);

const sortOrder = z.enum(["asc", "desc"], {
  required_error: "Invalid sort order",
  invalid_type_error: "Possible sort orders are: asc, desc",
});

export const getAllMoviesSchemaSortSchema = z.object({
  query: z.object({
    sortBy: movieKeys.optional(),
    order: sortOrder.optional(),
    page: zodParseId("page").optional(),
  }),
});

export const deleteMovieSchema = zodIdInParams;

export const getSingleMovieSchema = zodIdInParams;

export const updateSingleMovieSchema = createMovieSchema.merge(zodIdInParams);

export const patchSingleMovieDirectorSchema =
  zodIdInBodyDirector.merge(zodIdInParams);

export const createSingleMovieActorSchema =
  zodIdInParamsMovie.merge(zodIdInBodyActor);

export const deleteSingleMovieActorSchema = z.object({
  params: z.object({
    personId: zodParseId("personId"),
    movieId: zodParseId("movieId"),
  }),
});
