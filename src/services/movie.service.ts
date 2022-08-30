import DatabaseInstance from "@/lib/DatabaseInstance";
import {
  DeleteMovieInput,
  GetAllMoviesSortInput,
  GetSingleMovieInput,
  PatchMovieDirectorInput,
  UpdateMovieInputPrisma,
} from "@/types/movie.types";
import { Prisma } from "@prisma/client";

class MovieService {
  private readonly database: DatabaseInstance;

  constructor(database: DatabaseInstance) {
    this.database = database;
  }

  async getAllMovies({ sortBy, order, page }: GetAllMoviesSortInput) {
    const moviesTransaction = await this.database.getConnection().$transaction([
      this.database.getConnection().movie.count(),
      this.database.getConnection().movie.findMany({
        orderBy: {
          [sortBy ?? "createdAt"]: order ?? "asc",
        },
        skip: page ? (page - 1) * 10 : 0,
        take: 10,
      }),
    ]);

    const [totalMovieCount, movies] = moviesTransaction;

    const maxPage = Math.ceil(totalMovieCount / 10);

    const nextPage = page
      ? totalMovieCount > page * 10
        ? page + 1
        : null
      : totalMovieCount > 10
      ? 2
      : null;

    const previousPage =
      !page || page === 1 ? null : page > maxPage ? maxPage : page - 1;

    return { totalMovieCount, movies, nextPage, previousPage };
  }

  async getSingleMovie(input: GetSingleMovieInput) {
    const movie = await this.database.getConnection().movie.findFirstOrThrow({
      where: {
        id: Number(input.id),
      },
      include: {
        director: true,
        actors: true,
      },
    });
    return movie;
  }

  async createMovieActor(input: Prisma.MovieActorUncheckedCreateInput) {
    const movie = await this.database.getConnection().movieActor.create({
      data: {
        ...input,
      },
    });
    return movie;
  }

  async createMovie(input: Prisma.MovieCreateInput) {
    const movie = await this.database.getConnection().movie.create({
      data: { ...input, releaseDate: new Date(input.releaseDate) },
    });
    return movie;
  }

  async updateMovie(input: UpdateMovieInputPrisma) {
    const movie = await this.database.getConnection().movie.update({
      where: {
        id: Number(input.params.id),
      },
      data: {
        ...input.body,
        releaseDate: new Date(input.body.releaseDate as string),
      },
    });
    return movie;
  }

  async updateMovieDirector(input: PatchMovieDirectorInput) {
    const movie = await this.database.getConnection().movie.update({
      where: {
        id: Number(input.params.id),
      },
      data: {
        directorId: Number(input.body.directorId),
      },
    });
    return movie;
  }

  async deleteMovie(input: DeleteMovieInput) {
    const movie = await this.database.getConnection().movie.delete({
      where: {
        id: Number(input.id),
      },
    });
    return movie;
  }
}

export default MovieService;
