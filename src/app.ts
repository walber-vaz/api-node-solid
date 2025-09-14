import fastify from 'fastify';
import { appRoutes } from '@/http/routes';

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
      },
    },
  },
});

app.register(appRoutes);
