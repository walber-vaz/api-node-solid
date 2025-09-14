import type { Prisma, User } from '../../generated/prisma';

export interface iUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
