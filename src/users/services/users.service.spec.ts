import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// Modules
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { UsersModule } from '../users.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, UsersModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
