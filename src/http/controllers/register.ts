import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { hashPassword } from '@/lib/hash-password';
import { prisma } from '@/lib/prisma';

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

  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
    },
  });

  return reply.status(201).send({ message: 'User created successfully' });
};
