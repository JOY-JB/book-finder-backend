import express from "express";
import { BookRoutes } from "../modules/book/book.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user/",
    route: UserRoutes,
  },
  {
    path: "/books/",
    route: BookRoutes,
  },
  {
    path: "/books/",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
