import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API_GLOBAL_PREFIX, getApiPort } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(API_GLOBAL_PREFIX);
  await app.listen(getApiPort());
}

void bootstrap();
