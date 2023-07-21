import { Model, Schema } from "mongoose";

export interface IReview {
  bookId: Schema.Types.ObjectId;
  userEmail: string;
  comment: string;
}

export type ReviewModel = Model<IReview, Record<string, unknown>>;
