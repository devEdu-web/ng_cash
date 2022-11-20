import { Request, Router } from "express";
import { IUserPayload } from "../../types";
import { createUserController, logUserController } from "../controllers";
import { validationMiddlewares } from '../middlewares'

const authRouter = Router();

authRouter.post("/register", validationMiddlewares.validateRegisterPayload, (req: Request<{}, {}, IUserPayload>, res) => {
  return createUserController.handle(req, res);
});

authRouter.post("/login", (req: Request<{}, {}, IUserPayload>, res) => {
  return logUserController.handle(req, res);
});

export default authRouter;
