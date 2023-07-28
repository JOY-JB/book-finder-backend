"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.UserController.createUser);
router.post("/wishlist/:bookId", user_controller_1.UserController.addBookToWishList);
router.delete("/wishlist/:bookId", user_controller_1.UserController.removeBookFromWishList);
router.get("/:email", user_controller_1.UserController.getSingleUser);
router.get("/", user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
