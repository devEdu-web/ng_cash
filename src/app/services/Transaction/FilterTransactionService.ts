import { TOperation } from "../../../types";
import { TransactionRepository } from "../../repositories/Transaction";

export class FilterTransactionService {
  constructor(private TransactionRepository: TransactionRepository) {}
  async execute(userId: number, operation: TOperation) {
    try {
      if (operation == "cash-out") {
        const cashOutTransactions =
          await this.TransactionRepository.getUserCashOutTransactions(userId);
        return cashOutTransactions;
      } else if (operation == "cash-in") {
        const cashInTransactions =
          await this.TransactionRepository.getUserCashInTransactions(userId);
        return cashInTransactions;
      } else {
        throw new Error('Invalid Operation')
      }
    } catch (error) {
      throw error
    }
  }
}
