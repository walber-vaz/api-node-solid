import { hashPassword } from '@/lib/hash-password';
import type { iUsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';

interface iRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: iUsersRepository) {}

  async execute({ name, email, password }: iRegisterUseCaseRequest) {
    const hashedPassword = await hashPassword(password);
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    await this.userRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });
  }
}
