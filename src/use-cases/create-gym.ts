import type { Gym } from '@prisma/client';
import type { iGymsRepository } from '@/repositories/gyms-repository';

interface iGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface iGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: iGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: iGymUseCaseRequest): Promise<iGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
