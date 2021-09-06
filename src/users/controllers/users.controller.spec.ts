import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';

// Modules
import { DatabaseModule } from '../../database/database.module';
import { UsersModule } from '../users.module';

import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UserFactory } from '../factories/user.factory';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      controllers: [],
      providers: [],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    const connection = module.get(getConnectionToken('default'));
    connection.close();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const userFactory = new UserFactory();
      const resultPromise: Promise<Paginated<User>> =
        userFactory.createPagination(5);

      const result = await resultPromise;

      const query: PaginateQuery = {
        path: '',
      };

      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(() => resultPromise);

      expect(await usersController.findAll(query)).toBe(result);
    });
  });
});
