import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  userEmail: string;
}

export type BookModel = Model<IBook, Record<string, unknown>>;
