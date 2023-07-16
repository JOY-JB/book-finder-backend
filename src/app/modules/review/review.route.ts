import express from "express";
import { ReviewController } from "./review.controller";
const router = express.Router();

router.delete("/:id/reviews/:reviewId", ReviewController.deleteReview);

router.post("/:id/reviews", ReviewController.createBookReview);

router.get("/:id/reviews", ReviewController.getBookReview);

export const ReviewRoutes = router;
