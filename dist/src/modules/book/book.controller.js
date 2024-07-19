var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import catchAsync from "../../utils/catchAsync.js";
import { Book } from "../../../database/models/book.model.js";
import AppError from "../../utils/appError.js";
export default class BookHandlers {
    constructor() {
        this.getBooks = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const books = yield Book.find();
            res.status(200).json({ status: "success", data: { books } });
        }));
        this.getBook = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.findById(req.params.id);
            if (!book)
                return next(new AppError("Book was not found", 404));
            res.status(200).json({ status: "success", data: { book } });
        }));
        this.createBook = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.create(req.body);
            res.status(201).json({ status: "success", data: { book } });
        }));
        this.updateBook = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!book)
                return next(new AppError("Book was not found", 404));
            res.status(200).json({ status: "success", data: { book } });
        }));
        this.deleteBook = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.findByIdAndDelete(req.params.id, req.body);
            if (!book)
                return next(new AppError("Book was not found", 404));
            res.status(204).json({ status: "success", data: null });
        }));
    }
}
//# sourceMappingURL=book.controller.js.map