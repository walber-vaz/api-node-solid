import type { Gym } from '@prisma/client';
import type { iGymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements iGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
