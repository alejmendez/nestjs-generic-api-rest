import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto';
import { uuid } from '../../../common/utils';
import { mockUsersService } from './mocks';
import { PaginateQuery } from 'nestjs-paginate';

const generateCreateUserDto = (): CreateUserDto => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get users', async () => {
    const query: PaginateQuery = {
      limit: 10,
      path: '',
    };

    expect(mockUsersService.findAll).not.toHaveBeenCalled();

    const result = await controller.findAll(query);
    const expected = {
      data: expect.any(Array),
      links: {
        current: '',
      },
      meta: {
        currentPage: 1,
        itemsPerPage: 20,
        search: '',
        sortBy: [],
        searchBy: [],
        totalItems: 10,
        totalPages: 1,
      },
    };

    expect(result).toEqual(expected);

    expect(mockUsersService.findAll).toHaveBeenCalled();
    expect(mockUsersService.findAll).toHaveBeenCalledWith(query);
  });

  it('should get a user', async () => {
    const id = uuid();

    expect(mockUsersService.findOne).not.toHaveBeenCalled();

    const result = await controller.findOne(id);
    const expected = {
      id,
      username: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      emailVerifiedAt: expect.any(Date),
      verificationToken: expect.any(String),
      isActive: expect.any(Boolean),
    };

    expect(result).toEqual(expected);

    expect(mockUsersService.findOne).toHaveBeenCalled();
    expect(mockUsersService.findOne).toHaveBeenCalledWith(id);
  });

  it('should create a user', async () => {
    const dto = generateCreateUserDto();

    expect(mockUsersService.create).not.toHaveBeenCalled();
    const result = await controller.create(dto);
    const expected = {
      id: expect.any(String),
      ...dto,
    };
    expect(result).toEqual(expected);

    expect(mockUsersService.create).toHaveBeenCalled();
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', async () => {
    const dto = generateCreateUserDto();
    const id = uuid();

    expect(mockUsersService.update).not.toHaveBeenCalled();

    const result = await controller.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });

    expect(mockUsersService.update).toHaveBeenCalled();
    expect(mockUsersService.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a user', async () => {
    const dto = generateCreateUserDto();
    const id = uuid();

    expect(mockUsersService.remove).not.toHaveBeenCalled();

    const result = await controller.remove(id);
    expect(result).toEqual({
      id,
      ...dto,
    });

    expect(mockUsersService.remove).toHaveBeenCalled();
    expect(mockUsersService.remove).toHaveBeenCalledWith(id);
  });
});
