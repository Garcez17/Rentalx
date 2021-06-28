import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUser = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    await createUser.execute({
      driver_license: '123',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    const session = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(session).toHaveProperty('token');
    expect(session.user.name).toBe('John Doe');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with a wrong password', async () => {
    await createUser.execute({
      driver_license: '123',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
