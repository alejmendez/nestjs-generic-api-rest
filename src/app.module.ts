import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, AuthModule],
  providers: [],
})
export class AppModule {}
