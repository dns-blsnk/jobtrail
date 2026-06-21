import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '../features/auth/auth.module';
import { ContactModule } from '../features/contact/contact.module';
import { HealthModule } from '../features/health/health.module';
import { JobsModule } from '../features/jobs/jobs.module';
import { ProfileModule } from '../features/profile/profile.module';
import { UsersModule } from '../features/users/users.module';
import { PollingModule } from '../features/polling/polling.module';
import { PrismaModule } from '../shared/database/prisma.module';
import { envValidationSchema } from '../shared/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
      validationSchema: envValidationSchema,
      validationOptions: { allowUnknown: true, abortEarly: true },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
            limit: config.get<number>('THROTTLE_LIMIT', 5),
          },
        ],
        skipIf: () => config.get<string>('THROTTLE_ENABLED', 'true') === 'false',
      }),
    }),
    PrismaModule,
    AuthModule,
    ContactModule,
    JobsModule,
    ProfileModule,
    UsersModule,
    HealthModule,
    PollingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
