import type { Gym } from '@prisma/client';
import type { iGymsRepository } from '@/repositories/gyms-repository';

interface iSearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface iSearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: iGymsRepository) {}

  async execute({
    query,
    page,
  }: iSearchGymsUseCaseRequest): Promise<iSearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
