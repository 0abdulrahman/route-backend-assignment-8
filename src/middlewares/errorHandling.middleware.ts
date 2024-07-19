import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";
import { CastError } from "mongoose";

export default function errorHandlingMiddleware(err: AppError, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error: any = new Error(err.message);

  Object.getOwnPropertyNames(error).forEach((key) => {
    if (key !== "message" && key !== "stack") {
      (error as any)[key] = (error as any)[key];
    }
  });

  error.stack = error.stack;

  if (err.name === "CastError") {
    error = new AppError(`The value [${(error as CastError).value}] is invalid for [${(error as CastError).path}]`, 400);
  }

  if (err.name === "ValidationError") {
    const errors = Object.values((err as any).errors).map((err: any) => err.message);

    error = new AppError(`Invalid input data: \n- ${errors.join("\n- ")}`, 400);
  }

  if ((err as any).code === 11000) {
    const value =
      (err as any).errmsg.match(/"([^"]*)"/g)?.[0] || Object.keys((err as any)?.keyValue || { "one or more value": null }).join(" - ");

    error = new AppError(`Duplicate field value for (${value}). Please use another value!`, 400);
  }

  if (err.name === "JsonWebTokenError") error = new AppError("Invalid token, please login again!", 401);

  if (err.name === "TokenExpiredError") error = new AppError("Your token has expired, please login again!", 401);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
