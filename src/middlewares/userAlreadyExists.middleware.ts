import { NextFunction, Request, Response } from "express";
import usersRepositories from "../repositories/users.repositories";

const userAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userAlreadyExists = await usersRepositories.findOne({ id });

  if (!userAlreadyExists) {
    return res.status(400).json({ message: "User not found" });
  }

  req.user = userAlreadyExists;
  return next();
};

export { userAlreadyExistsMiddleware };
