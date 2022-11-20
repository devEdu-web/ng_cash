import { UserRepository } from "../../repositories/User";
import AuthUtils from "../../../utils/AuthUtils";
import { IUserPayload } from "../../../types";

export class CreateUserService {
  constructor(private UserRepository: UserRepository) {}
  async execute(user: IUserPayload) {
    try {
      const encryptPassword = await AuthUtils.encryptPassword(user.password);
      return await this.UserRepository.create({
        ...user,
        password: encryptPassword,
      });
    } catch (error) {
      throw error;
    }
  }
}
