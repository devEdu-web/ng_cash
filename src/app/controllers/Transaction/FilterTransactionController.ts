import { Request, Response } from "express";
import { TOperation, IFilterTransactionParams } from "../../../types";
import { FilterTransactionService } from "../../services/Transaction/FilterTransactionService";

export class FilterTransactionController {
  constructor(private FilterTransactionService: FilterTransactionService) {}
  async handle(req: Request, res: Response) {
    const operation = req.params.operation as TOperation;
    const userId = res.locals.loggedUser.id;
    try {
      const transactions = await this.FilterTransactionService.execute(
        Number(userId),
        operation
      );
      return res.json(transactions);
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
