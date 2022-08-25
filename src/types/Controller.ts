import { NextFunction, Response, Request } from "express";
import { Service } from "./Service";

export abstract class Controller<T> {
  private controllerService: Service<T>;

  constructor(service: Service<T>) {
    this.controllerService = service;
  }

  get service() {
    return this.controllerService;
  }

  abstract getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void>;

  abstract getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void>;

  abstract create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void>;

  abstract update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void>;

  abstract delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void>;
}
