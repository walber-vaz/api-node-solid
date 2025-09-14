import { app } from '@/app';
import { env } from '@/config/env';

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`🚀 Server listening on http://0.0.0.0:${env.PORT}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
