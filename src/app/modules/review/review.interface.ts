import { Model, Schema } from "mongoose";

export interface IReview {
  bookId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  comment: string;
}

export type ReviewModel = Model<IReview, Record<string, unknown>>;
