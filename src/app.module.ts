import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

// Modules
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
  ],
  providers: [],
})
export class AppModule {}
