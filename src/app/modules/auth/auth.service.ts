import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Admin } from "../admin/admin.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from "./auth.interface";
import { User } from "./auth.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (user.role == "buyer" && user.income) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Required Budget only");
  }
  if (user.role == "seller" && user.budget) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Required Income only");
  }

  const newUser = await User.create(user);

  return newUser;
};

const hi = async (): Promise<string | null> => {
  return "Hiiii";
};

const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  const { id, userData } = isUserExist;

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    userData.password &&
    !(await User.isPasswordMatched(password, userData.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    { id, role: userData.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role: userData.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { id } = verifiedToken;

  // checking deleted admin's refresh token
  const isAdminExist = await Admin.findById(id);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }

  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isAdminExist.id,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  userLogin,
  refreshToken,
  hi,
};
