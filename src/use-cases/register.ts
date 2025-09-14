import { hashPassword } from '@/lib/hash-password';
import type { iUsersRepository } from '@/repositories/users-repository';

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
      throw new Error('User already exists');
    }

    await this.userRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });
  }
}
