import {
  CreatePersonInput,
  UpdateSinglePersonInput,
} from "@/types/person.types";
import { NextFunction, Request, Response } from "express";
import { HttpStatuses } from "@/lib/httpStatuses";
import { Controller } from "@/types/Controller";
import { Person } from "@prisma/client";
import PersonService from "@/services/person.service";

class PersonController extends Controller<Person> {
  constructor(service: PersonService) {
    super(service);
  }

  async getAll(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    try {
      const people = await this.service.getAll();
      return res.status(HttpStatuses.OK).json({ data: people });
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.getOne({ id: Number(id) });
      if (person === null) {
        return res
          .status(HttpStatuses.NOT_FOUND)
          .json({ message: "Person not found" });
      }
      return res.status(HttpStatuses.OK).json({ data: person });
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request<any, any, CreatePersonInput>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    try {
      const person = await this.service.create(req.body);
      return res.status(HttpStatuses.CREATED).json({ data: person });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<any, any, UpdateSinglePersonInput["body"]>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.update({
        body: { ...req.body, birthDate: new Date(req.body.birthDate) },
        params: { id },
      });
      return res.status(HttpStatuses.CREATED).json({ data: person });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.delete({ id: Number(id) });
      return res.status(HttpStatuses.OK).json({ data: person });
    } catch (error) {
      next(error);
    }
  }
}

export default PersonController;
