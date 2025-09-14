import { beforeEach, describe, expect, it } from 'vitest';
import { verifyPassword } from '@/lib/hash-password';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';
import { RegisterUseCase } from './register';

let userRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });

    const isPasswordHashed = await verifyPassword(
      user.password_hash,
      'securePassword123',
    );

    expect(isPasswordHashed).toBe(true);
  });

  it('should not allow registration with an existing email', async () => {
    const email = 'john.doe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'securePassword123',
    });

    await expect(() =>
      sut.execute({
        name: 'Jane Doe',
        email,
        password: 'anotherSecurePassword456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
