import PersonController from "@/controllers/person.controller";
import { Router } from "express";
import { validateZod } from "@/middlewares/zodValidate.middleware";
import {
  createPersonSchema,
  deletePersonSchema,
  getSinglePersonSchema,
  updateSinglePersonSchema,
} from "@/schemas/person.schema";

class PersonRoutes {
  private router: Router;
  private controller: PersonController;

  constructor(router: Router, controller: PersonController) {
    this.router = router;
    this.controller = controller;
    this.initializeRoutes();
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

  public getRoutes() {
    return this.router;
  }
}

export default PersonRoutes;
