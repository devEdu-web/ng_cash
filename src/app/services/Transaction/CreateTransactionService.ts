import { Prisma } from "@prisma/client";
import { IUser } from "../../../types";
import { TransactionRepository } from "../../repositories/Transaction";
import { UserRepository } from "../../repositories/User";

export class CreateTransactionService {
  constructor(
    private TransactionReporitory: TransactionRepository,
    private UserRespoitory: UserRepository
  ) {}

  async execute(
    creditedAccountInfo: IUser,
    debtiedAccountInfo: IUser,
    value: number
  ) {
    // here we assume both accounts exists, because we checked in a middleware
    try {
      const newTransaction = await this.TransactionReporitory.create(
        debtiedAccountInfo.id,
        creditedAccountInfo.id,
        new Prisma.Decimal(value)
      );

      await this.UserRespoitory.updateBalance(
        creditedAccountInfo.id,
        "cash-out",
        new Prisma.Decimal(value)
      );
      await this.UserRespoitory.updateBalance(
        debtiedAccountInfo.id,
        "cash-in",
        new Prisma.Decimal(value)
      );

      return newTransaction;
    } catch (error) {
      throw error;
    }
  }

  validateTransfer(creditedAccountInfo: IUser, value: number) {
    if (Number(creditedAccountInfo.account.balance) < value) {
      return false;
    } else {
      return true;
    }
  }
}
