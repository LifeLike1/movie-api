import {
  createPersonSchema,
  deletePersonSchema,
  getSinglePersonSchema,
  updateSinglePersonSchema,
} from "@/schemas/person.schema";
import { z } from "zod";
import { InferedBody } from "@/types/InferedBody";

export type CreatePersonInput = InferedBody<z.infer<typeof createPersonSchema>>;

export type DeletePersonInput = InferedBody<z.infer<typeof deletePersonSchema>>;

export type GetSinglePersonInput = InferedBody<
  z.infer<typeof getSinglePersonSchema>
>;

export type UpdateSinglePersonInput = z.infer<typeof updateSinglePersonSchema>;
