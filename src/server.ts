import { app } from '@/app';

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`🚀 Server listening on http://0.0.0.0:3333`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
