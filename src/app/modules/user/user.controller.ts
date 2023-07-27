import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully !",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;

  const result = await UserService.getSingleUser(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const User = req.body;

    const result = await UserService.createUser(User);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  }
);

const addBookToWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const { userEmail } = req.body;

    const result = await UserService.addBookToWishList(userEmail, bookId);

    sendResponse<string[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book added to WishList successfully!",
      data: result,
    });
  }
);

const removeBookFromWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const { userEmail } = req.body;

    await UserService.removeBookFromWishList(userEmail, bookId);

    sendResponse<null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book removed from WishList successfully!",
      data: null,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  addBookToWishList,
  removeBookFromWishList,
};
