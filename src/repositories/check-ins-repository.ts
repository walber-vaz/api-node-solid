import type { CheckIn, Prisma } from '../../generated/prisma';

export interface iCheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  // findById: (id: string) => Promise<CheckIn | null>;
  // findManyByUserId: (userId: string) => Promise<CheckIn[]>;
}
