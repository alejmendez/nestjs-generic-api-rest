import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// services
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

  it('should create a new user record and return that', async () => {
    const dto = createUserDto();

    expect(mockUsersRepository.create).not.toHaveBeenCalled();
    const result: User = await service.create(dto);
    const expected = {
      id: expect.any(String),
      username: dto.username.toLowerCase(),
      email: dto.email.toLowerCase(),
      password: expect.any(String),
      emailVerifiedAt: null,
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
