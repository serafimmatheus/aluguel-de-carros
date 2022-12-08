import { Router } from "express";
import { userController } from "../controllers";
import {
  authUserTokenAlreadyExistsMiddleware,
  userAlreadyExistsMiddleware,
} from "../middlewares";

export const routes = Router();

routes.post("/users", userController.createdUserController);

routes.post("/users/login", userController.loginUsersController);

routes.get(
  "/users",
  authUserTokenAlreadyExistsMiddleware,
  userController.getAllUsersController
);

routes.patch(
  "/users/:id",
  userAlreadyExistsMiddleware,
  authUserTokenAlreadyExistsMiddleware,
  userController.updatedUserController
);

routes.delete(
  "/users/:id",
  userAlreadyExistsMiddleware,
  authUserTokenAlreadyExistsMiddleware,
  userController.deletedUsersController
);

routes.get("/users/source", userController.findByOneUserNameController);
