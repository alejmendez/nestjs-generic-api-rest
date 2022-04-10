import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/services/users.service';
import { mockUsersService } from 'src/modules/users/test/mocks';
import { AuthService } from '../services/auth.service';
import { mockJwtService } from './mocks/jwt.service.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
