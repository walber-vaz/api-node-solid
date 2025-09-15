import type { User } from '@prisma/client';
import { hashPassword } from '@/lib/hash-password';
import type { iUsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';

interface iRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface iRegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: iUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: iRegisterUseCaseRequest): Promise<iRegisterUseCaseResponse> {
    const hashedPassword = await hashPassword(password);
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    return {
      user,
    };
  }
}
