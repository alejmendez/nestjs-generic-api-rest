import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PayloadToken } from '../../src/modules/auth/models/token.model';
import { User } from '../../src/modules/users/entities/user.entity';
import { AppConfig } from '../../src/config/interfaces/app.config';
import { getModule } from './server';

export const generateJwt = (user: User): string => {
  const module = getModule();
  const configService = module.get<ConfigService>(ConfigService);
  const config = configService.get<AppConfig>('app');

  const jwtService = new JwtService({
    secret: config.jwtSecret,
    signOptions: { expiresIn: '7200s' },
  });
  const payload: PayloadToken = {
    username: user.username,
    role: user.role,
    sub: user.id,
  };
  return jwtService.sign(payload);
};
