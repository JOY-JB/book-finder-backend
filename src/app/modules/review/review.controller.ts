import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IReview } from "./review.interface";
import { ReviewService } from "./review.service";

const createBookReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { userId, comment } = req.body;

  const review = await ReviewService.createReview(bookId, userId, comment);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully!",
    data: review,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  await ReviewService.deleteReview(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
  });
});

const getBookReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const reviews = await ReviewService.getReviewsForBook(bookId);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully!",
    data: reviews,
  });
});

export const ReviewController = {
  createBookReview,
  deleteReview,
  getBookReview,
};
