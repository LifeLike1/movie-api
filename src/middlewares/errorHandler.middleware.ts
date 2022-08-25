import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
    return res.status(HttpStatuses.BAD_REQUEST).json({
      code: error.code,
      message: error.meta?.cause || error.message,
    });
  }

  return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json(error);
};
