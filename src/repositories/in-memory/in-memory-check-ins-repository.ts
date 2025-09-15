import { randomUUID } from 'node:crypto';
import type { CheckIn, Prisma } from '../../../generated/prisma';
import type { iCheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements iCheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }
}
