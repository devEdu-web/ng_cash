import { Request, Response } from "express";
import { GetUserBalanceService } from "../../services/User/GetUserBalanceService";

export class GetUserBalanceController {
  constructor(private GetUserBalanceService: GetUserBalanceService) {}
  async handle(req: Request, res: Response) {
    const userId = res.locals.loggedUser.id;
    try {
      const userBalance = await this.GetUserBalanceService.execute(
        Number(userId)
      );
      return res.json({
        userId,
        userBalance,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
