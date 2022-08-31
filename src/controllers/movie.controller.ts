import { NextFunction, Request, Response } from "express";
import { HttpStatuses } from "@/lib/httpStatuses";
import { Prisma } from "@prisma/client";
import MovieService from "@/services/movie.service";
import { PatchMovieDirectorInput } from "@/types/movie.types";
import { PaginatedMovies } from "@/types/PaginatedMovie";

class MovieController {
  private readonly service: MovieService;

  constructor(service: MovieService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { totalMovieCount, movies, nextPage, previousPage } =
        await this.service.getAllMovies({
          ...req.query,
          page: Number(req.query.page),
        });

      const returnMovies: PaginatedMovies = {
        data: movies,
        info: {
          count: totalMovieCount,
          next: null,
          previous: null,
        },
      };

      if (nextPage) {
        const url = new URL(
          `${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        url.searchParams.set("page", nextPage.toString());
        returnMovies.info.next = url.toString();
      }

      if (previousPage) {
        const url = new URL(
          `${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        url.searchParams.set("page", previousPage.toString());
        returnMovies.info.previous = url.toString();
      }

      return res.status(HttpStatuses.OK).json(returnMovies);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing movie id" });
    }
    try {
      const movie = await this.service.getSingleMovie({ id: Number(id) });
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

  async createMovieActor(req: Request, res: Response, next: NextFunction) {
    const { movieId } = req.params;
    if (!movieId) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing movie id" });
    }
    try {
      const movieActor = await this.service.createMovieActor({
        body: { ...req.body },
        params: { movieId: Number(movieId) },
      });
      return res.status(HttpStatuses.CREATED).json({ data: movieActor });
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
        .json({ message: "Missing movie id" });
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
        .json({ message: "Missing movie id" });
    }
    try {
      const movie = await this.service.updateMovieDirector({
        body: { ...req.body },
        params: { id },
      });
      return res.status(HttpStatuses.OK).json({ data: movie });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing movie id" });
    }
    try {
      const movie = await this.service.deleteMovie({ id: Number(id) });
      return res.status(HttpStatuses.OK).json({ data: movie });
    } catch (error) {
      next(error);
    }
  }

  async deleteMovieActor(req: Request, res: Response, next: NextFunction) {
    const { movieId, personId } = req.params;
    if (!movieId) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing movie id" });
    }
    if (!personId) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Missing actor id" });
    }
    try {
      const movieActor = await this.service.deleteMovieActor({
        movieId: Number(movieId),
        personId: Number(personId),
      });
      return res.status(HttpStatuses.OK).json({ data: movieActor });
    } catch (error) {
      next(error);
    }
  }
}

export default MovieController;
