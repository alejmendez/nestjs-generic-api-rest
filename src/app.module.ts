import * as path from 'path';

import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { I18nModule } from 'nestjs-i18n';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    UsersModule,
    AuthModule,
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
