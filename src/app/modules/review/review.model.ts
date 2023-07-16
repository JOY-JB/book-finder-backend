import { model, Schema } from "mongoose";
import { IReview, ReviewModel } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "books", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>("review", reviewSchema);
