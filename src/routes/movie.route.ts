import { Router } from "express";
import { validateZod } from "@/middlewares/zodValidate.middleware";
import MovieController from "./../controllers/movie.controller";
import {
  createMovieSchema,
  createSingleMovieActorSchema,
  deleteMovieSchema,
  deleteSingleMovieActorSchema,
  getAllMoviesSchemaSortSchema,
  getSingleMovieSchema,
  patchSingleMovieDirectorSchema,
  updateSingleMovieSchema,
} from "./../schemas/movie.schema";

class MovieRoutes {
  private readonly router: Router;
  private readonly controller: MovieController;

  constructor(router: Router, controller: MovieController) {
    this.router = router;
    this.controller = controller;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      "/",
      validateZod(getAllMoviesSchemaSortSchema),
      this.controller.getAll.bind(this.controller)
    );

    this.router.get(
      "/:id",
      validateZod(getSingleMovieSchema),
      this.controller.getOne.bind(this.controller)
    );

    this.router.post(
      "/",
      validateZod(createMovieSchema),
      this.controller.create.bind(this.controller)
    );

    this.router.post(
      "/:movieId/actors",
      validateZod(createSingleMovieActorSchema),
      this.controller.createMovieActor.bind(this.controller)
    );

    this.router.put(
      "/:id",
      validateZod(updateSingleMovieSchema),
      this.controller.update.bind(this.controller)
    );

    this.router.patch(
      "/director/:id",
      validateZod(patchSingleMovieDirectorSchema),
      this.controller.patchDirector.bind(this.controller)
    );

    this.router.delete(
      "/:id",
      validateZod(deleteMovieSchema),
      this.controller.delete.bind(this.controller)
    );

    this.router.delete(
      "/:movieId/actors/:personId",
      validateZod(deleteSingleMovieActorSchema),
      this.controller.deleteMovieActor.bind(this.controller)
    );
  }

  public getRoutes() {
    return this.router;
  }
}

export default MovieRoutes;
