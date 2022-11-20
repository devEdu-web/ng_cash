import { CreateUserService } from "./CreateUserService";
import { LogUserService } from "./LogUserService";
import { GetUserBalanceService } from "./GetUserBalanceService";
import { userRepository } from "../../repositories";

const createUserService = new CreateUserService(userRepository);
const logUserService = new LogUserService(userRepository);
const getUserBalanceService = new GetUserBalanceService(userRepository);

export { createUserService, logUserService, getUserBalanceService };
