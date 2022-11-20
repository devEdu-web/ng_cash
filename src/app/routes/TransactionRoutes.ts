import { Request, Router } from "express";
import { ITransactionPayload } from "../../types";
import {
  createTransactionController,
  filterTransactionController,
  getUserTransactionsController
} from "../controllers";
import { authMiddlewares, transactionMiddlewares } from "../middlewares";

const transactionRouter = Router();

transactionRouter.post(
  "/create",
  authMiddlewares.requireUser,
  (req: Request<{}, {}, ITransactionPayload>, res, next) => {
    return transactionMiddlewares.validateTransaction(req, res, next);
  },
  (req: Request<{}, {}, ITransactionPayload>, res) => {
    return createTransactionController.handle(req, res);
  }
);

transactionRouter.get(
  "/all",
  authMiddlewares.requireUser,
  (req, res) => {
    return getUserTransactionsController.handle(req, res)
  }
)

transactionRouter.get(
  "/filter/:operation",
  authMiddlewares.requireUser,
  (req, res) => {
    return filterTransactionController.handle(req, res)
  }
);

export default transactionRouter;
