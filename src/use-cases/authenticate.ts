import { verifyPassword } from '@/lib/hash-password';
import type { iUsersRepository } from '@/repositories/users-repository';
import type { User } from '../../generated/prisma';
import { InvalidCredentialError } from './erros/invalid-credential-error';

interface iAuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface iAuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: iUsersRepository) {}

  async execute({
    email,
    password,
  }: iAuthenticateUseCaseRequest): Promise<iAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatch = await verifyPassword(
      user.password_hash,
      password,
    );

    if (!doesPasswordMatch) {
      throw new InvalidCredentialError();
    }

    return {
      user,
    };
  }
}
