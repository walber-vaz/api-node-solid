import type { Gym, Prisma } from '@prisma/client';

export interface iFindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface iGymsRepository {
  findById: (id: string) => Promise<Gym | null>;
  searchMany: (query: string, page: number) => Promise<Gym[]>;
  create: (data: Prisma.GymCreateInput) => Promise<Gym>;
  findManyNearby: (params: iFindManyNearbyParams) => Promise<Gym[]>;
}
