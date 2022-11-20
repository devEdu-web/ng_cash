import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";
import path from "path";
import { IVerifiedPayload } from "../types";

dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

const secret = process.env.SECRET as string;

class AuthUtils {
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }
  signJwt(jwtPayload: object, options: SignOptions): string {
    return jwt.sign(jwtPayload, secret);
  }
  verifyJwt(token: string): IVerifiedPayload {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        valid: true,
        decoded,
      };
    } catch (error) {
      return {
        valid: false,
        decoded: null,
      };
    }
  }
}

export default new AuthUtils();
