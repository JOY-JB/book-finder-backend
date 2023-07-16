import express from "express";
import { BookRoutes } from "../modules/book/book.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/books/",
    route: BookRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
