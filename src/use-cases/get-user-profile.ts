import type { iUsersRepository } from '@/repositories/users-repository';
import type { User } from '../../generated/prisma';
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface iGetUserProfileUseCaseRequest {
  userId: string;
}
interface iGetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: iUsersRepository) {}

  async execute({
    userId,
  }: iGetUserProfileUseCaseRequest): Promise<iGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
