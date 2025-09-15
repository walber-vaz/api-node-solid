import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from './erros/resource-not-found-error';
import { GetUserProfileUseCase } from './get-user-profile';

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: 'hashed-password',
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('John Doe');
    expect(user.email).toEqual('john.doe@example.com');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
