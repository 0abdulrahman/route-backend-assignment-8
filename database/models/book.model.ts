import { model, Query, Schema, Types } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required!"],
  },
  content: {
    type: String,
    required: [true, "Book content is required!"],
  },
  author: {
    type: Types.ObjectId,
    ref: "Author",
    required: [true, "Book author is required!"],
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
});

bookSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.populate("author");

  next();
});

export const Book = model("Book", bookSchema);
