import { CreateTransactionController } from "./CreateTransactionController";
import { FilterTransactionController } from "./FilterTransactionController";
import { GetUserTransactionsController } from "./GetUserTransactionsController";
import {
  createTransactionService,
  filterTransactionService,
  getUserTransactionsService,
} from "../../services";

const createTransactionController = new CreateTransactionController(
  createTransactionService
);

const filterTransactionController = new FilterTransactionController(
  filterTransactionService
);

const getUserTransactionsController = new GetUserTransactionsController(
  getUserTransactionsService
);

export {
  createTransactionController,
  filterTransactionController,
  getUserTransactionsController,
};
