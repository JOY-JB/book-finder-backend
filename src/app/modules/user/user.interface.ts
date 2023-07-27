import { Model } from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  wishlist: string[];
}

export type UserModel = Model<IUser, Record<string, unknown>>;
