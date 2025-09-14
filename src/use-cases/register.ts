import { hashPassword } from '@/lib/hash-password';
import { prisma } from '@/lib/prisma';

interface iRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: any) {}

  async execute({ name, email, password }: iRegisterUseCaseRequest) {
    const hashedPassword = await hashPassword(password);
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

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
