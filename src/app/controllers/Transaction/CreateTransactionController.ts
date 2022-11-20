import { ITransactionPayload, IUser } from "../../../types";
import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/Transaction/CreateTransactionService";

export class CreateTransactionController {
  constructor(private CreateTransactionService: CreateTransactionService) {}
  async handle(req: Request<{}, {}, ITransactionPayload>, res: Response) {
    const debitedAccountInfo = res.locals.debitedAccount as IUser;
    const creditedAccountInfo = res.locals.loggedUser as IUser;
    const valueToTransfer = req.body.value;

    try {
      const newTransaction = await this.CreateTransactionService.execute(
        creditedAccountInfo,
        debitedAccountInfo,
        Number(valueToTransfer)
      );
      res.status(201).json(newTransaction);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
