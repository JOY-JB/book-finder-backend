import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/", UserController.createUser);

router.post("/wishlist/:bookId", UserController.addBookToWishList);
router.delete("/wishlist/:bookId", UserController.removeBookFromWishList);

router.get("/:email", UserController.getSingleUser);
router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
