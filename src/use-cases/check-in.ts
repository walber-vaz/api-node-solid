import type { iCheckInsRepository } from '@/repositories/check-ins-repository';
import type { CheckIn } from '../../generated/prisma';

interface iCheckInUseCaseRequest {
  userId: string;
  gymId: string;
}
interface iCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: iCheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: iCheckInUseCaseRequest): Promise<iCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
