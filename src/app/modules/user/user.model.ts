import mongoose, { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>("Users", UserSchema);
