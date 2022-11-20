import { createUserService, logUserService } from '../app/services'
import { IUser, IUserPayload } from "../types";
import { faker } from '@faker-js/faker'

const debitedAccountCredentials: IUserPayload = { // will receive the money
  username: faker.internet.userName(),
  password: "validPassword1"
}

const creditedAccountCredentials: IUserPayload = {
  username: faker.internet.userName(),
  password: "validPassword1"
}

export class TestUtils {
  async createValidUser(userCredentials: IUserPayload) {
    try {
      const createdUser = await createUserService.execute(userCredentials)
      return createdUser
    } catch (error) {
      throw error
    }
  }
  async logUser(userCredentials: IUserPayload) {
    try {
      const accessToken = await logUserService.execute(userCredentials)
      return accessToken
    } catch (error) {
      throw error
    }
  }
  async gatherAccountsInfo() {
    try {
      const debitedAccount = await this.createValidUser(debitedAccountCredentials)
      const creditedAccount = await this.createValidUser(creditedAccountCredentials)
      const accessToken = await this.logUser({username: creditedAccount.username, password: creditedAccountCredentials.password})

      return {
        creditedAccountId: creditedAccount.id,
        creditedAccountUsername: creditedAccount.username,
        debitedAccountId: debitedAccount.id,
        debitedAccountUsername: debitedAccount.username,
        accessToken: accessToken
      }

    } catch (error) {
      throw error
    }
  }
}