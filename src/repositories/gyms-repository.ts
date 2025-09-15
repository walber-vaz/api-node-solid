import type { Gym } from '@prisma/client';

export interface iGymsRepository {
  findById: (id: string) => Promise<Gym | null>;
}
