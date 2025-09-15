import type { Gym } from '@prisma/client';
import type { iGymsRepository } from '@/repositories/gyms-repository';

interface iFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface iFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: iGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: iFetchNearbyGymsUseCaseRequest): Promise<iFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
