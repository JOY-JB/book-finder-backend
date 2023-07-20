import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (
  bookId: string,
  userId: string,
  comment: string
): Promise<IReview> => {
  const review = new Review({ bookId, userId, comment });

  const newReview = await review.save();
  return newReview;
};

const deleteReview = async (reviewId: string): Promise<void> => {
  const isExist = await Review.findById(reviewId);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "review not found");
  }

  await Review.deleteOne({ _id: reviewId });
};

const getReviewsForBook = async (bookId: string): Promise<IReview[]> => {
  const reviews = await Review.find({ bookId });
  return reviews;
};

export const ReviewService = {
  createReview,
  deleteReview,
  getReviewsForBook,
};
