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
import AppError from "../../utils/appError.js";
import { Author } from "../../../database/models/author.model.js";
import { Types } from "mongoose";
export default class AuthorHandlers {
    constructor() {
        this.getAuthors = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authors = yield Author.aggregate([
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
        }));
        this.getAuthor = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authors = yield Author.aggregate([
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
            if (!authors.length)
                return next(new AppError("Author was not found", 404));
            res.status(200).json({ status: "success", data: { author: authors[0] } });
        }));
        this.createAuthor = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const author = yield Author.create(req.body);
            res.status(201).json({ status: "success", data: { author } });
        }));
        this.updateAuthor = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const author = yield Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!author)
                return next(new AppError("Author was not found", 404));
            res.status(200).json({ status: "success", data: { author } });
        }));
        this.deleteAuthor = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const author = yield Author.findByIdAndDelete(req.params.id, req.body);
            if (!author)
                return next(new AppError("Author was not found", 404));
            res.status(204).json({ status: "success", data: null });
        }));
    }
}
//# sourceMappingURL=author.controller.js.map