import request from "supertest";
import app from "../../src/app";
import Client from "../../src/database/client";
import { IUserPayload } from "../../src/types";
import { TestUtils } from "../../src/utils/TestUtils";
import { faker } from "@faker-js/faker";

let accessToken: string;
let userId: number;

describe("User Test Suite", () => {
  beforeAll(async () => {
    const helpers = new TestUtils();

    try {
      const usersInfo = await helpers.gatherAccountsInfo();
      accessToken = usersInfo.accessToken;
      userId = usersInfo.creditedAccountId;
    } catch (error) {
      throw error;
    }
  });
  afterAll(async () => {
    Client.user.deleteMany({});
    Client.account.deleteMany({});
    Client.account.deleteMany({});
  });
  it("Should get user balance", async () => {
    const response = await request(app)
      .get("/user/balance")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
    expect(response.body.userBalance).toBe("100");
    expect(response.body.userId).toBe(userId);
  });
});
