import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";

export default function (req: Request, res: Response, next: NextFunction) {
  const err = new AppError(`The route ${req.originalUrl} you requested does not exist on the server.`, 404);

  next(err);
}
