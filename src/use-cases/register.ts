import { hashPassword } from '@/lib/hash-password';
import { prisma } from '@/lib/prisma';

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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
    },
  });
};
