import { Request, Response } from "express";
import { IUserPayload } from "../../../types";
import { LogUserService } from "../../services/User/LogUserService";

export class LogUserController {
  constructor(private LogUserService: LogUserService) {}
  async handle(req: Request<{}, {}, IUserPayload>, res: Response) {
    try {
      const token = await this.LogUserService.execute(req.body);
      return res.status(200).json({
        access_token: token,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
