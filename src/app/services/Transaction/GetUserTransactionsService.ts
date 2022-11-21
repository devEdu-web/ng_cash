import { TransactionRepository } from "../../repositories/Transaction";

export class GetUserTransactionsService {
  constructor(private TransactionRepository: TransactionRepository) {}

  async execute(userId: number) {
    try {
      return await this.TransactionRepository.getTransactions(userId);
    } catch (error) {
      throw error;
    }
  }
}
