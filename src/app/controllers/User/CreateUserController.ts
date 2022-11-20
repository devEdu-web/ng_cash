import { Request, Response } from "express";
import { IUserPayload } from "../../../types";
import { CreateUserService } from "../../services/User/CreateUserService";

export class CreateUserController {
  constructor(private CreateUserService: CreateUserService) {}
  async handle(req: Request<{}, {}, IUserPayload>, res: Response) {
    try {
      const user = req.body;
      const savedUser = await this.CreateUserService.execute(user);
      return res.status(201).json(savedUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
