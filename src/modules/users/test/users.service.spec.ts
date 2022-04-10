import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';

import { uuid } from '../../../common/utils';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { mockUsersRepository } from './mocks/users.repository.mock';
import { createUserDto } from './mocks/user.dto.mock';

const numberOfCharactersUsedToGenerateUserValidationToken = 64;

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get users', async () => {
    const query: PaginateQuery = {
      limit: 10,
      path: '',
    };

    expect(mockUsersRepository.findAll).not.toHaveBeenCalled();

    const result = await service.findAll(query);
    const expected = {
      data: expect.any(Array),
      links: {
        current: '?page=1&limit=10&sortBy=username:DESC',
        first: undefined,
        last: undefined,
        next: undefined,
        previous: undefined,
      },
      meta: {
        currentPage: 1,
        filter: undefined,
        itemsPerPage: 10,
        search: undefined,
        searchBy: undefined,
        totalItems: 10,
        totalPages: 1,
        sortBy: [['username', 'DESC']],
      },
    };

    expect(result).toEqual(expected);
  });

  it('should get a user', async () => {
    const id = uuid();

    expect(mockUsersRepository.findOneOrFail).not.toHaveBeenCalled();

    const result = await service.findOne(id);
    const expected = {
      id,
      username: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      emailVerifiedAt: expect.any(Date),
      verificationToken: expect.any(String),
      role: expect.any(String),
      isActive: expect.any(Boolean),
    };

    expect(result).toEqual(expected);

    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalled();
    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalledWith(id);
  });

  it('should create a new user record and return that', async () => {
    const dto = createUserDto();
    mockUsersRepository.findOne.mockResolvedValue(null);

    expect(mockUsersRepository.create).not.toHaveBeenCalled();
    const result: User = await service.create(dto);
    const expected = {
      id: expect.any(String),
      username: dto.username.toLowerCase(),
      email: dto.email.toLowerCase(),
      password: expect.any(String),
      emailVerifiedAt: expect.any(Date),
      verificationToken: expect.any(String),
      isActive: true,
      role: expect.any(String),
      createAt: expect.any(Date),
      updateAt: expect.any(Date),
      deleteAt: null,
    };
    expect(result).toEqual(expected);

    expect(result.verificationToken.length).toBe(
      numberOfCharactersUsedToGenerateUserValidationToken,
    );
    expect(mockUsersRepository.create).toHaveBeenCalled();
    expect(mockUsersRepository.create).toHaveBeenCalledWith(dto);
  });
});
