import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(user_id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async create(data: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export { UsersRepository };
