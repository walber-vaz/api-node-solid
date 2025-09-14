import { hashPassword } from '@/lib/hash-password';
import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

interface iRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async ({
  name,
  email,
  password,
}: iRegisterUseCaseRequest) => {
  const hashedPassword = await hashPassword(password);
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('User already exists');
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: hashedPassword,
  });
};
