import { Model } from "mongoose";

export type IAdmin = {
  password: string;
  role: "admin";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IAdminExistResponse = {
  adminData: Pick<IAdmin, "password" | "role" | "phoneNumber"> | null;
  id: string;
};

export type IVerifiedLoginAdmin = {
  _id: string;
  role: "admin";
};

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<IAdminExistResponse>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
