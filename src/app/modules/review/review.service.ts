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
