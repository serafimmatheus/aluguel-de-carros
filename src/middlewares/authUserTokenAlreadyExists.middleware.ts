import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";

dotenv.config();

const authUserTokenAlreadyExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  return verify(token, process.env.SECRETE_USER_TOKEN, (error) => {
    if (error) {
      return res.status(401).json({ message: "Token inválid" });
    }

    return next();
  });
};

export { authUserTokenAlreadyExistsMiddleware };
