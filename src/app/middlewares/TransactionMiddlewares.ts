import { Request, Response, NextFunction } from "express";
import { ITransactionPayload, IUser } from "../../types";
import { UserRepository } from "../repositories/User";

export class TransactionMiddlewares {
  constructor(private UserRepository: UserRepository) {}
  async validateTransaction(
    req: Request<{}, {}, ITransactionPayload>,
    res: Response,
    next: NextFunction
  ) {
    const creditedAccountInfo = await this.UserRepository.findByUserName(
      res.locals.loggedUser.username
    );
    if (Number(creditedAccountInfo?.account.balance) < Number(req.body.value)) {
      return res
        .status(400)
        .json({ message: "Insufficient balance to conclude transaction." });
    }

    const debitedAccountInfo = await this.UserRepository.findByUserName(
      req.body.transferTo
    );

    if (!debitedAccountInfo) {
      return res.status(400).json({ message: "Inexisting username." });
    }

    if (debitedAccountInfo.username == creditedAccountInfo?.username) {
      return res
        .status(400)
        .json({
          message: "Debited account and credited account can't be the same.",
        });
    }

    res.locals.debitedAccount = debitedAccountInfo;
    return next();
  }
}
