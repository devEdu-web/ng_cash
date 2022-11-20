import express, { Application } from "express";
import authRouter from "./app/routes/AuthRoutes";
import transactionRouter from "./app/routes/TransactionRoutes";
import userRouter from "./app/routes/UserRoutes";
import { authMiddlewares } from "./app/middlewares";

class App {
  readonly express: Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(authMiddlewares.deserializeUser);
  }

  private routes() {
    this.express.use("/auth", authRouter);
    this.express.use("/transactions", transactionRouter);
    this.express.use("/user", userRouter);
  }
}

export default new App().express;
