import fastify from 'fastify';

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

app.get('/', async (_request, reply) => {
  return reply.send({ hello: 'world' });
});
