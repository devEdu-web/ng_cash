import { NextFunction, Request, Response } from "express";
import AuthUtils from "../../utils/AuthUtils";

export class AuthMiddlewares {
  deserializeUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (token) {
      const { decoded } = AuthUtils.verifyJwt(token);
      res.locals.loggedUser = decoded;
      return next();
    }
    return next();
  }
  requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.loggedUser;
    if (!user) {
      return res.sendStatus(403);
    }
    return next();
  }
}
