import bcrypt from "bcrypt";
import { IUserPayload, IUser } from "../../../types";
import AuthUtils from "../../../utils/AuthUtils";
import { UserRepository } from "../../repositories/User";

export class LogUserService {
  constructor(private UserRepository: UserRepository) {}
  async execute(user: IUserPayload) {
    try {
      const userFetched = await this.UserRepository.findByUserName(
        user.username
      );
      if (!userFetched) throw new Error("Email or password invalid.");

      const doesPasswordsMatch = await bcrypt.compare(
        user.password,
        userFetched.password
      );
      if (!doesPasswordsMatch) throw new Error("Email or password invalid.");

      const token = this.generateToken(userFetched);
      return token;
    } catch (error) {
      throw error;
    }
  }
  generateToken(userFetched: IUser) {
    const token = AuthUtils.signJwt(
      {
        id: userFetched.id,
        username: userFetched.username,
      },
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}
