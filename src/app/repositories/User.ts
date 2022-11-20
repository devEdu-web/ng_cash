import { Prisma } from "@prisma/client";
import Client from "../../database/client";
import { IUser, IUserPayload, IUserRepository, TOperation } from "../../types";

export class UserRepository implements IUserRepository {
  async create(user: IUserPayload): Promise<Omit<IUser, "password">> {
    try {
      const userCreated = Client.user.create({
        data: {
          username: user.username,
          password: user.password,
          account: {
            create: {
              balance: 100.0,
            },
          },
        },
        select: {
          username: true,
          id: true,
          accountId: true,
          account: {
            select: {
              balance: true,
            },
          },
        },
      });
      return userCreated;
    } catch (error) {
      throw error;
    }
  }
  async findByUserName(username: string): Promise<IUser | null> {
    try {
      const user = await Client.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
          password: true,
          id: true,
          accountId: true,
          account: {
            select: {
              balance: true,
            },
          },
        },
      });
      return user;
    } catch (error: any) {
      throw error;
    }
  }
  async getBalance(userId: number): Promise<Prisma.Decimal | undefined> {
    try {
      const balance = await Client.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          account: {
            select: {
              balance: true,
            },
          },
        },
      });
      return balance?.account.balance;
    } catch (error) {
      throw error;
    }
  }
  async updateBalance(
    userId: number,
    operation: TOperation,
    value: Prisma.Decimal
  ): Promise<Omit<IUser, "password">> {
    const balance = await this.getBalance(userId);

    if (!balance) throw new Error("Balance is unavailable");

    let newBalance: number;

    if (balance && operation == "cash-out") {
      newBalance = Number(balance) - Number(value);
    } else {
      newBalance = Number(balance) + Number(value);
    }

    try {
      const updatedUser = await Client.user.update({
        where: {
          id: userId,
        },
        data: {
          account: {
            update: {
              balance: newBalance,
            },
          },
        },
        select: {
          username: true,
          id: true,
          accountId: true,
          account: {
            select: {
              balance: true,
            },
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
