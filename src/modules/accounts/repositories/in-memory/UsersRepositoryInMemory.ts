import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async findById(user_id: string): Promise<User> {
    return this.users.find(user => user.id === user_id);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  public async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;
  }
}

export { UsersRepositoryInMemory };
