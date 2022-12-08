import { triggerAsyncId } from "async_hooks";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
  all: () => Promise<User[]>;
  findOne: (payload: object) => Promise<User>;
  update: (id: string, payload: Partial<User>) => Promise<UpdateResult>;
  deleted: (id: string) => Promise<DeleteResult>;
  findOneByName: (name: string) => Promise<object>;
}

class UserRepo implements IUserRepo {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.repo.save(user);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<User>) =>
    await this.repo.update(id, { ...payload });

  deleted = async (id: string) => await this.repo.delete({ id });

  findOneByName = async (name: any) =>
    await this.repo.find({
      where: {
        userName: name,
      },
    });
}

export default new UserRepo();
