import { Router } from "express";
import { getUserBalanceController } from "../controllers";
import { authMiddlewares } from '../middlewares/'

const userRouter = Router();

userRouter.get("/balance", authMiddlewares.deserializeUser, (req, res) => {
  return getUserBalanceController.handle(req, res);
});

export default userRouter;
