import type { iCheckInsRepository } from '@/repositories/check-ins-repository';

interface iGetUserMetricsUseCaseRequest {
  userId: string;
}
interface iGetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: iCheckInsRepository) {}

  async execute({
    userId,
  }: iGetUserMetricsUseCaseRequest): Promise<iGetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
