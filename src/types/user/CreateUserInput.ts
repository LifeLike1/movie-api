import { z } from "zod";
import { createPersonSchema } from "../../schemas/person.schema";

export type CreatePersonInput = z.infer<typeof createPersonSchema>;
