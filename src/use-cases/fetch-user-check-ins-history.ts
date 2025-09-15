import type { CheckIn } from '@prisma/client';
import type { iCheckInsRepository } from '@/repositories/check-ins-repository';

interface iFetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}
interface iFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: iCheckInsRepository) {}

  async execute({
    userId,
    page,
  }: iFetchUserCheckInsHistoryUseCaseRequest): Promise<iFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
