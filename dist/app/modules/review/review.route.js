"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.delete("/:id/reviews/:reviewId", review_controller_1.ReviewController.deleteReview);
router.post("/:id/reviews", review_controller_1.ReviewController.createBookReview);
router.get("/:id/reviews", review_controller_1.ReviewController.getBookReview);
exports.ReviewRoutes = router;
