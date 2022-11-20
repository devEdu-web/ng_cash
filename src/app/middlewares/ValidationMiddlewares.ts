import { NextFunction, Request, Response } from "express";
import { IUserPayload } from "../../types";

export class ValidationMiddleware {
  validateRegisterPayload(req: Request<IUserPayload>, res: Response, next: NextFunction) {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    
    const checkPassword = req.body.password.match(regexPassword)

    if(!checkPassword) return res.status(400).json({ message: 'Weak password.' })

    if(req.body.username.length < 3) return res.status(400).json({ message: 'Username must be at least 3 characters long.' })

    return next()

  }
}