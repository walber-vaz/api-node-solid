import type { CheckIn, Prisma } from '@prisma/client';

export interface iCheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
  // findById: (id: string) => Promise<CheckIn | null>;
  // findManyByUserId: (userId: string) => Promise<CheckIn[]>;
}
