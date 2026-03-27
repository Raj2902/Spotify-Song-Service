import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res
    .status(500)
    .json({ message: err.message || "Internal Server Error" });
};
