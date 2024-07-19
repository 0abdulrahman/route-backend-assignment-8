import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import { Author } from "../../../database/models/author.model.js";
import { Types } from "mongoose";

export default class AuthorHandlers {
  getAuthors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await Author.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        },
      },
    ]);

    res.status(200).json({ status: "success", data: { authors } });
  });

  getAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await Author.aggregate([
      {
        $match: { _id: new Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        },
      },
    ]);

    if (!authors.length) return next(new AppError("Author was not found", 404));

    res.status(200).json({ status: "success", data: { author: authors[0] } });
  });

  createAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author = await Author.create(req.body);

    res.status(201).json({ status: "success", data: { author } });
  });

  updateAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!author) return next(new AppError("Author was not found", 404));

    res.status(200).json({ status: "success", data: { author } });
  });

  deleteAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author = await Author.findByIdAndDelete(req.params.id, req.body);

    if (!author) return next(new AppError("Author was not found", 404));

    res.status(204).json({ status: "success", data: null });
  });
}
