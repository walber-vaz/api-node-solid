import type { FastifyInstance } from 'fastify';
import { authenticate } from '@/http/controllers/authenticate';
import { register } from '@/http/controllers/register';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);
};
