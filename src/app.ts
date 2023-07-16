import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
const app: Application = express();

// middleware
app.use(cors());
app.use(cookieParser());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("This is Book Finder Live Link");
});

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found!",
      },
    ],
  });
  next();
});

export default app;
