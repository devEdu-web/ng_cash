import { CreateTransactionService } from "./CreateTransactionService";
import { FilterTransactionService } from "./FilterTransactionService";
import { GetUserTransactionsService } from "./GetUserTransactionsService";
import { userRepository, transactionRepository } from "../../repositories";

const createTransactionService = new CreateTransactionService(
  transactionRepository,
  userRepository
);

const filterTransactionService = new FilterTransactionService(
  transactionRepository
);

const getUserTransactionsService = new GetUserTransactionsService(
  transactionRepository
);

export {
  createTransactionService,
  filterTransactionService,
  getUserTransactionsService,
};
