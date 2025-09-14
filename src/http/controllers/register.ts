import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { registerUseCase } from '@/use-cases/register';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
  });

  const { email, name, password } = createUserBodySchema.parse(request.body);

  try {
    await registerUseCase({ name, email, password });
  } catch {
    return reply.status(409).send();
  }

  return reply.status(201).send({ message: 'User created successfully' });
};
