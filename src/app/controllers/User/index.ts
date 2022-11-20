import {
  createUserService,
  logUserService,
  getUserBalanceService,
} from "../../services";

import { CreateUserController } from "./CreateUserController";
import { LogUserController } from "./LogUserController";
import { GetUserBalanceController } from "./GetUserBalanceController";

const createUserController = new CreateUserController(createUserService);
const logUserController = new LogUserController(logUserService);
const getUserBalanceController = new GetUserBalanceController(
  getUserBalanceService
);

export { createUserController, logUserController, getUserBalanceController };
