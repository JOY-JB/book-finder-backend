import { Model } from "mongoose";

export type IUser = {
  password: string;
  role: "seller" | "buyer";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IUserExistResponse = {
  userData: Pick<IUser, "password" | "role" | "phoneNumber"> | null;
  id: string;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<IUserExistResponse>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
