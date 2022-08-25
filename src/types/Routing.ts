import { Router } from "express";
import { Controller } from "@/types/Controller";

export abstract class Routing<T> {
  private entityRouter: Router;
  private entityController: Controller<T>;

  constructor(entityRouter: Router, controller: Controller<T>) {
    this.entityRouter = entityRouter;
    this.entityController = controller;
    this.initializeRoutes();
  }

  get router() {
    return this.entityRouter;
  }

  get controller() {
    return this.entityController;
  }

  protected abstract initializeRoutes(): void;

  public getRoutes() {
    return this.router;
  }
}
