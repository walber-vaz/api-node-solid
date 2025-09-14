import { prisma } from '@/lib/prisma';
import type { Prisma } from '../../../generated/prisma';
import type { iUsersRepository } from '../users-repository';

export class PrismaUsersRepository implements iUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}
