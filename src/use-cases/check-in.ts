import type { CheckIn } from '@prisma/client';
import type { iCheckInsRepository } from '@/repositories/check-ins-repository';
import type { iGymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface iCheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
interface iCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: iCheckInsRepository,
    private gymsRepository: iGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: iCheckInUseCaseRequest): Promise<iCheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calculate the distance between user and gym
    // if the distance is greater than 100 meters, throw an error

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new Error('User has already checked in today.');
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
