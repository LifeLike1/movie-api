import { z } from "zod";
import { InferedBody } from "@/types/InferedBody";
import {
  createMovieSchema,
  createSingleMovieActorSchema,
  deleteMovieSchema,
  deleteSingleMovieActorSchema,
  getAllMoviesSchemaSortSchema,
  patchSingleMovieDirectorSchema,
} from "@/schemas/movie.schema";
import { getSingleMovieSchema } from "./../schemas/movie.schema";
import { Prisma } from "@prisma/client";

export type CreateMovieInput = InferedBody<z.infer<typeof createMovieSchema>>;

export type GetAllMoviesSortInput = InferedBody<
  z.infer<typeof getAllMoviesSchemaSortSchema>
>;

export type GetSingleMovieInput = InferedBody<
  z.infer<typeof getSingleMovieSchema>
>;

export type DeleteMovieInput = InferedBody<z.infer<typeof deleteMovieSchema>>;

export type UpdateMovieInputPrisma = {
  body: Prisma.MovieUncheckedUpdateInput;
  params: { id: Number };
};

export type PatchMovieDirectorInput = z.infer<
  typeof patchSingleMovieDirectorSchema
>;

export type CreateMovieActorInput = z.infer<
  typeof createSingleMovieActorSchema
>;

export type DeleteMovieActorInput = InferedBody<
  z.infer<typeof deleteSingleMovieActorSchema>
>;
