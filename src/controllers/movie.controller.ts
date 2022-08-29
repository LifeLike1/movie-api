import { NextFunction, Request, Response } from "express";
import { HttpStatuses } from "@/lib/httpStatuses";
import { Prisma } from "@prisma/client";
import MovieService from "@/services/movie.service";
import { PatchMovieDirectorInput } from "@/types/movie.types";

class MovieController {
  private readonly service: MovieService;

  constructor(service: MovieService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await this.service.getAllMovies(req.query);
      return res.status(HttpStatuses.OK).json({ data: movies });
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
      const movie = await this.service.getSingleMovie({ id: Number(id) });
      if (movie === null) {
        return res
          .status(HttpStatuses.NOT_FOUND)
          .json({ message: "Movie not found" });
      }
      return res.status(HttpStatuses.OK).json({ data: movie });
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request<any, any, Prisma.MovieCreateInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const movie = await this.service.createMovie(req.body);
      return res.status(HttpStatuses.CREATED).json({ data: movie });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request<any, any, Prisma.MovieUncheckedUpdateInput>,
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
      const movie = await this.service.updateMovie({
        body: { ...req.body },
        params: { id },
      });
      return res.status(HttpStatuses.CREATED).json({ data: movie });
    } catch (error) {
      next(error);
    }
  }

  async patchDirector(
    req: Request<any, any, PatchMovieDirectorInput["body"]>,
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
      const person = await this.service.updateMovieDirector({
        body: { ...req.body },
        params: { id },
      });
      return res.status(HttpStatuses.OK).json({ data: person });
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
      const person = await this.service.deleteMovie({ id: Number(id) });
      return res.status(HttpStatuses.OK).json({ data: person });
    } catch (error) {
      next(error);
    }
  }
}

export default MovieController;
