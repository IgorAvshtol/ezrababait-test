import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';

const corsOptions: CorsOptions = {
  allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
  credentials: true,
  origin: [process.env.APP_FRONT_URL],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(process.env.APP_PORT);
}

bootstrap();
