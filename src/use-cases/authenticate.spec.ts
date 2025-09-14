import { beforeEach, describe, expect, it } from 'vitest';
import { hashPassword } from '@/lib/hash-password';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialError } from './erros/invalid-credential-error';

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate a user with valid credentials', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hashPassword('securePassword123'),
    });

    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'wrong.email@example.com',
        password: 'securePassword123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hashPassword('securePassword123'),
    });

    await expect(
      sut.execute({
        email: 'john.doe@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
