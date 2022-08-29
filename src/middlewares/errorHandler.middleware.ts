import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";
import { HttpStatuses } from "@/lib/httpStatuses";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    const [errorData] = error.issues;
    return res.status(HttpStatuses.BAD_REQUEST).json({
      code: errorData.code,
      message: errorData.message,
    });
  }
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      return res.status(HttpStatuses.BAD_REQUEST).json({
        code: error.code,
        message: "Cannot find foreign key",
        meta: error.meta,
      });
    }
    return res.status(HttpStatuses.BAD_REQUEST).json({
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
  if (error instanceof PrismaClientInitializationError) {
    return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({
      code: "DB_ERROR",
      message: "Database connection information is incorrect",
    });
  }
  return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({ error });
};
