import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './controllers/auth.controller';
import { CurrentUserController } from './controllers/currentUser.controller';
import { AppConfig } from '../../config/interfaces/app.config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<AppConfig>('app');

        return {
          secret: config.jwtSecret,
          signOptions: { expiresIn: '7200s' },
        };
      },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, CurrentUserController],
})
export class AuthModule {}
