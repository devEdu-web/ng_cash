import { UserRepository } from "./User";
import { TransactionRepository } from "./Transaction";

const userRepository = new UserRepository();
const transactionRepository = new TransactionRepository();

export { userRepository, transactionRepository };
