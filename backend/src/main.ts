import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(rateLimit({ windowMs: 1000, max: 50 })); // return 429-code error response if received more than 50 requests per second
  await app.listen(3001);
}
bootstrap();
