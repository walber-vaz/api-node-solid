import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../authenticate';

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
};
