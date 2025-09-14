import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialError } from '@/use-cases/erros/invalid-credential-error';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createUserBodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const { email, password } = createUserBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send({ message: 'User authenticated successfully' });
};
