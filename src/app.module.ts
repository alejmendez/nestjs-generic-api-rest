import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Config
import { enviroments } from './enviroments';
import config from './config';

// Modules
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
