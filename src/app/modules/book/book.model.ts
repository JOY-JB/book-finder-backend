import { model, Schema } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.publicationDate = ret.publicationDate.toISOString().split("T")[0];
      },
    },
  }
);

export const Book = model<IBook, BookModel>("books", bookSchema);
