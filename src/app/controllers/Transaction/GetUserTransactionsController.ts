import { Request, Response } from "express";
import { GetUserTransactionsService } from "../../services/Transaction/GetUserTransactionsService";

export class GetUserTransactionsController {
  constructor(private GetUserTransactionsService: GetUserTransactionsService) {}
  async handle(req: Request, res: Response) {
    try {
      const userId = Number(res.locals.loggedUser.id);
      const userTransactions = await this.GetUserTransactionsService.execute(
        userId
      );
      return res.json(userTransactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
