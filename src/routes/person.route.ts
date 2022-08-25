import PersonController from "@/controllers/person.controller";
import { Router } from "express";
import { validateZod } from "@/middlewares/zodValidate.middleware";
import {
  createPersonSchema,
  deletePersonSchema,
  getSinglePersonSchema,
  updateSinglePersonSchema,
} from "@/schemas/person.schema";
import { Routing } from "@/types/Routing";
import { Person } from "@prisma/client";

class PersonRoutes extends Routing<Person> {
  constructor(entityRouter: Router, controller: PersonController) {
    super(entityRouter, controller);
  }

  protected initializeRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));

    this.router.get(
      "/:id",
      validateZod(getSinglePersonSchema),
      this.controller.getOne.bind(this.controller)
    );

    this.router.post(
      "/",
      validateZod(createPersonSchema),
      this.controller.create.bind(this.controller)
    );

    this.router.put(
      "/:id",
      validateZod(updateSinglePersonSchema),
      this.controller.update.bind(this.controller)
    );

    this.router.delete(
      "/:id",
      validateZod(deletePersonSchema),
      this.controller.delete.bind(this.controller)
    );
  }
}

export default PersonRoutes;
