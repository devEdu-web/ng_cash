import { ITransaction, ITransactionRepository } from "../../types";
import Client from "../../database/client";
import { Prisma } from "@prisma/client";

export class TransactionRepository implements ITransactionRepository {
  async create(
    debitedAccountId: number,
    creditedAccountId: number,
    value: Prisma.Decimal
  ): Promise<ITransaction> {
    try {
      const newTransaction = await Client.transaction.create({
        data: {
          debitedAccountId,
          creditedAccountId,
          value,
        },
      });
      return newTransaction;
    } catch (error) {
      throw error;
    }
  }
  async getTransactions(userId: number) {
    try {
      const userTransactions = await Client.transaction.findMany({
        where: {
          OR: [
            {
              debitedAccountId: userId
            },
            {
              creditedAccountId: userId
            }
          ]
        },
        select: {
          id: true,
          creditedAccountId: true,
          debitedAccountId: true,
          value: true,
          createdAt: true,
          creditedAccount: {
            select: {
              user: {
                select: {
                  username: true
                }
              }
            }
          },
          debitedAccount: {
            select: {
              user:{
                select: {
                  username: true
                }
              }
            }
          }
        }
      })
      return userTransactions
    } catch (error) {
      throw error
    }
  }
  async getUserCashOutTransactions(userId: number) {
    try {
      const transactions = await Client.transaction.findMany({
        where: {
          creditedAccountId: userId,
        },
        select: {
          id: true,
          creditedAccountId: true,
          debitedAccountId: true,
          createdAt: true,
          value: true,
          creditedAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          debitedAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
  async getUserCashInTransactions(userId: number) {
    try {
      const transactions = await Client.transaction.findMany({
        where: {
          debitedAccountId: userId,
        },
        select: {
          id: true,
          creditedAccountId: true,
          debitedAccountId: true,
          createdAt: true,
          value: true,
          creditedAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          debitedAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
