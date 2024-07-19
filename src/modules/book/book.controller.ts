import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { Book } from "../../../database/models/book.model.js";
import AppError from "../../utils/appError.js";

export default class BookHandlers {
  getBooks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find();

    res.status(200).json({ status: "success", data: { books } });
  });

  getBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id);

    if (!book) return next(new AppError("Book was not found", 404));

    res.status(200).json({ status: "success", data: { book } });
  });

  createBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.create(req.body);

    res.status(201).json({ status: "success", data: { book } });
  });

  updateBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!book) return next(new AppError("Book was not found", 404));

    res.status(200).json({ status: "success", data: { book } });
  });

  deleteBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findByIdAndDelete(req.params.id, req.body);

    if (!book) return next(new AppError("Book was not found", 404));

    res.status(204).json({ status: "success", data: null });
  });
}
