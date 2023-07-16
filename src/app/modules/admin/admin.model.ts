import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAdmin, AdminModel, IAdminExistResponse } from "./admin.interface";
import config from "../../../config";

const adminSchema = new Schema<IAdmin>(
  {
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IAdminExistResponse> {
  const adminData = await Admin.findOne(
    { phoneNumber },
    { password: 1, role: 1, phoneNumber: 1 }
  );

  let id = null;

  if (adminData) {
    id = adminData.id;
  }

  return {
    adminData,
    id,
  };
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre("save", async function (next) {
  // hashing user password
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

adminSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
