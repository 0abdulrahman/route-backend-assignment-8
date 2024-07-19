import { model, Schema } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Author name is required!"],
  },
  bio: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
});

export const Author = model("Author", authorSchema);
