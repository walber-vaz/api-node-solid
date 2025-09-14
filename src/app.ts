import fastify from 'fastify';
import { ZodError, z } from 'zod';
import { env } from '@/config/env';
import { appRoutes } from '@/http/routes';

export const app = fastify({
  logger: env.NODE_ENV !== 'test' && {
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

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // todo: here we should log the error to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error',
  });
});
