import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import usersRepositories from "../repositories/users.repositories";
import * as dotenv from "dotenv";

dotenv.config();

interface IPropsUser {
  name: string;
  userName: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IPropsUserLogin {
  email: string;
  password: string;
}

class UserServices {
  userCreatedService = async ({
    name,
    userName,
    email,
    password,
    driver_license,
  }: IPropsUser) => {
    const passwordHashed = await hash(password, 10);

    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const newUser = {
      name,
      userName,
      email,
      password: passwordHashed,
      driver_license,
    };
    const users = await usersRepositories.save(newUser);
    return users;
  };

  getAllUsers = async () => {
    const users = await (
      await usersRepositories.all()
    ).map((u) => {
      const { password, ...newData } = u;
      return newData;
    });

    return users;
  };

  deletedUsersService = async (id: string) => {
    const deletedUser = await usersRepositories.deleted(id);
    return deletedUser;
  };

  updatedUserService = async (id: string, payload: Object) => {
    const userAlreadyExists = await usersRepositories.findOne({ id });

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const updatedUser = await usersRepositories.update(id, payload);

    return updatedUser;
  };

  loginUsersService = async ({ email, password }: IPropsUserLogin) => {
    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (!userAlreadyExists) {
      throw new Error("User or password inválid");
    }

    if (!(await compare(password, userAlreadyExists.password))) {
      throw new Error("User or password inválid");
    }

    const userToken = {
      id: userAlreadyExists.id,
    };

    const token = sign({ ...userToken }, process.env.SECRETE_USER_TOKEN, {
      expiresIn: "1h",
    });

    return token;
  };
}

export default new UserServices();
