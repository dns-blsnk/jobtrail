import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { getApiPort } from './shared/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet({ contentSecurityPolicy: false }));

  const config = app.get(ConfigService);
  const allowedOrigins = config
    .get<string>('ALLOWED_ORIGINS', 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({ origin: allowedOrigins, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const fields: Record<string, string> = {};
        for (const err of errors) {
          fields[err.property] = Object.values(err.constraints ?? {}).at(-1) ?? 'Invalid value';
        }
        return new HttpException(
          { message: 'Validation failed', fields },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      },
    }),
  );

  app.setGlobalPrefix('api/v1');

  // TODO: Enable Swagger for API documentation
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Job Search Tracker API')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('api/docs', app, document);

  await app.listen(getApiPort());
}

void bootstrap();
