import PersonController from "@/controllers/person.controller";
import { Router } from "express";
import { validateZod } from "@/middlewares/zodValidate.middleware";
import {
  createPersonSchema,
  deletePersonSchema,
  updateSinglePersonSchema,
} from "@/schemas/person.schema";

class PersonRoutes {
  private api;
  private personController;

  constructor() {
    this.api = Router();
    this.personController = new PersonController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.api.get("/", this.personController.getAll.bind(this.personController));

    this.api.get(
      "/:id",
      this.personController.getOne.bind(this.personController)
    );

    this.api.post(
      "/",
      validateZod(createPersonSchema),
      this.personController.create.bind(this.personController)
    );

    this.api.put(
      "/:id",
      validateZod(updateSinglePersonSchema),
      this.personController.update.bind(this.personController)
    );

    this.api.delete(
      "/:id",
      validateZod(deletePersonSchema),
      this.personController.delete.bind(this.personController)
    );
  }

  public getRoutes() {
    return this.api;
  }
}

export default new PersonRoutes();
