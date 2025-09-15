import type { Prisma, User } from '@prisma/client';

export interface iUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
}
