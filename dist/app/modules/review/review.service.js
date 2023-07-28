"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const review_model_1 = require("./review.model");
const createReview = (bookId, userEmail, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new review_model_1.Review({ bookId, userEmail, comment });
    const newReview = yield review.save();
    return newReview;
});
const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield review_model_1.Review.findById(reviewId);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "review not found");
    }
    yield review_model_1.Review.deleteOne({ _id: reviewId });
});
const getReviewsForBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ bookId });
    return reviews;
});
exports.ReviewService = {
    createReview,
    deleteReview,
    getReviewsForBook,
};
