import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateZod =
  (schema: AnyZodObject) =>
  async (req: Request, _: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
