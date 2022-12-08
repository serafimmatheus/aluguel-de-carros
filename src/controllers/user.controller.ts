import { Request, Response } from "express";
import usersRepositories from "../repositories/users.repositories";
import { userServices } from "../services";

class UserController {
  loginUsersController = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await userServices.loginUsersService({ email, password });

      return res.status(200).json(token);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
  createdUserController = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const user = await userServices.userCreatedService(body);

      const newUser = {
        id: user.id,
        name: user.name,
        userName: user.userName,
        driver_license: user.driver_license,
        created_at: user.created_at,
      };

      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  getAllUsersController = async (_: Request, res: Response) => {
    try {
      const users = await userServices.getAllUsers();

      return res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  };

  deletedUsersController = async (req: Request, res: Response) => {
    const { id } = req.user;

    await userServices.deletedUsersService(id);

    return res.status(200).json(req.user);
  };

  updatedUserController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userUpdated = await userServices.updatedUserService(id, req.body);

      return res.status(200).json(userUpdated);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  };

  findByOneUserNameController = async (req: Request, res: Response) => {
    const { userName } = req.query;

    const userFind = await usersRepositories.findOneByName(userName);

    return res.status(200).json(userFind);
  };
}

export default new UserController();
