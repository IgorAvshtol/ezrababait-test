import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';

const corsOptions: CorsOptions = {
  allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
  credentials: true,
  origin: ['http://localhost:3000'],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(4000);
}

bootstrap();
