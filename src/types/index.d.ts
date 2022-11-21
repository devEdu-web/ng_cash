import { Prisma } from "@prisma/client";

type TOperation = "cash-in" | "cash-out";

interface IUser {
  id: number;
  username: string;
  password: string;
  accountId: number;
  account: {
    balance: Prisma.Decimal;
  };
}
interface IUserPayload extends Omit<IUser, "id" | "accountId" | "account"> {}
interface IUserRepository {
  create(user: IUserPayload): Promise<Omit<IUser, "password">>;
  findByUserName(username: string): Promise<IUser, null>;
  updateBalance(
    userId: number,
    operation: TOperation,
    value: Prisma.Decimal
  ): Promise<Omit<IUser, "password">>;
  getBalance(userId: number): Promise<Prisma.Decimal | undefined>;
}

interface IVerifiedPayload {
  valid: boolean;
  decoded: JwtPayload | null | string;
}

interface IAccount {
  id: number;
  balance: number;
}

interface ITransaction {
  id: number;
  value: Prisma.Decimal;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: Date;
}

interface ITransactionPayload {
  transferTo: string;
  value: number | string;
}

interface ITransactionRepository {
  create(
    debitedAccountId: number,
    creditedAccountId: number,
    value: Prisma.Decimal
  ): Promise<ITransaction>;
  getTransactions(userId: number): Promise<ITransactionDbPayload[]>;
  getUserCashOutTransactions(userId: number): Promise<ITransactionDbPayload[]>;
  getUserCashInTransactions(userId: number): Promise<ITransactionDbPayload[]>;
}

interface ITransactionDbPayload {
  value: Prisma.Decimal;
  debitedAccount: {
    user: {
      username: string;
    } | null;
  };
  creditedAccount: {
    user: {
      username: string;
    } | null;
  };
  createdAt: Date;
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
}

interface IFilterTransactionParams {
  operation: TOperation;
}
