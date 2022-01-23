import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './controllers/auth.controller';
import { AppConfig } from '../../config/interfaces/app.config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}