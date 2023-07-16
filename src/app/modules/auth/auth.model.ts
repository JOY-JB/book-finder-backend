import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserExistResponse, UserModel } from "./auth.interface";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<IUserExistResponse> {
  const userData = await User.findOne(
    { phoneNumber },
    { password: 1, role: 1, phoneNumber: 1 }
  );

  let id = null;

  if (userData) {
    id = userData.id;
  }

  return {
    userData,
    id,
  };
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
