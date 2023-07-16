import express from "express";
import { BookController } from "./book.controller";
const router = express.Router();

router.delete("/:id", BookController.deleteBook);
router.patch("/:id", BookController.updateBook);

router.post("/", BookController.createBook);

router.get("/:id", BookController.getSingleBook);
router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
