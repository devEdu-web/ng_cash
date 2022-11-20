import { AuthMiddlewares } from "./AuthMiddlewares";
import { TransactionMiddlewares } from "./TransactionMiddlewares";
import { ValidationMiddleware } from './ValidationMiddlewares'
import { userRepository } from "../repositories";

const authMiddlewares = new AuthMiddlewares();
const transactionMiddlewares = new TransactionMiddlewares(userRepository);
const validationMiddlewares = new ValidationMiddleware()

export { authMiddlewares, transactionMiddlewares, validationMiddlewares };
