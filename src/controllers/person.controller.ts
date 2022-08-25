import {
  CreatePersonInput,
  UpdateSinglePersonInput,
} from "@/types/person.types";
import { NextFunction, Request, Response } from "express";
import PersonService from "./../services/person.service";
import { HttpStatuses } from "@/lib/httpStatuses";

class PersonController {
  private personSerivce: PersonService = new PersonService();

  get service() {
    return this.personSerivce;
  }

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const people = await this.service.getAllPeople();
      return res.status(HttpStatuses.OK).json({ data: people });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.getPerson({ id: Number(id) });
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
  ) {
    try {
      const person = await this.service.createPerson(req.body);
      return res.status(HttpStatuses.CREATED).json({ data: person });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<any, any, UpdateSinglePersonInput["body"]>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.updatePerson({
        body: { ...req.body, birthDate: new Date(req.body.birthDate) },
        params: { id },
      });
      return res.status(HttpStatuses.CREATED).json({ data: person });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing id" });
    }
    try {
      const person = await this.service.deletePerson({ id: Number(id) });
      return res.status(HttpStatuses.OK).json({ data: person });
    } catch (error) {
      next(error);
    }
  }
}

export default PersonController;
