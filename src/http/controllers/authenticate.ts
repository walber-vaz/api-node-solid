import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialError } from '@/use-cases/erros/invalid-credential-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

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
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send({ message: 'User authenticated successfully' });
};
