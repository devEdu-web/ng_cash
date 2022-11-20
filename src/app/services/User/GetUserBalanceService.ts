import { UserRepository } from "../../repositories/User";

export class GetUserBalanceService {
  constructor(private UserRepository: UserRepository) {}
  async execute(userId: number) {
    try {
      return await this.UserRepository.getBalance(userId);
    } catch (error) {
      throw error;
    }
  }
}
