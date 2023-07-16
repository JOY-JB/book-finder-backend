import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin, ILoginAdminResponse } from "./admin.interface";
import { AdminService } from "./admin.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body;

  const result = await AdminService.createAdmin(admin);

  sendResponse<IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin created successfully",
    data: result,
  });
});

const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.adminLogin(loginData);
  const { refreshToken, ...accessToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: accessToken,
  });
});

export const AdminController = {
  createAdmin,
  adminLogin,
};
