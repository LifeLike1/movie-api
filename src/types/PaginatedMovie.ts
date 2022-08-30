import { Movie } from "@prisma/client";

export type PaginatedMovies = {
  data: Movie[];
  info: {
    count: number;
    next: null | string;
    previous: null | string;
  };
};
