import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from "./auth.interface";
import { AuthService } from "./auth.service";

const hi = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.hi();

  sendResponse<string>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user created successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await AuthService.createUser(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user created successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.userLogin(loginData);
  const { refreshToken, ...accessToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: accessToken,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

export const AuthController = {
  createUser,
  userLogin,
  refreshToken,
  hi,
};
