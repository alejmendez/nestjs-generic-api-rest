import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';

// services
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto';
import { uuid } from '../../../common/utils';

const numberOfCharactersUsedToGenerateUserValidationToken = 64;
const now = new Date();

const mockUsersRepository = {
  create: jest.fn().mockImplementation((dto: CreateUserDto) => {
    const user: User = {
      id: uuid(),
      username: dto.username,
      email: dto.email,
      password: dto.password,
      emailVerifiedAt: null,
      verificationToken: null,
      isActive: true,
      createAt: now,
      updateAt: now,
      deleteAt: null,
    };
    return user;
  }),
  save: jest.fn().mockImplementation((user) =>
    Promise.resolve({
      id: uuid(),
      ...user,
    }),
  ),
  findOneOrFail: jest.fn(),
  findOne: jest.fn(),
  merge: jest.fn(),
  softDelete: jest.fn(),
  update: jest.fn(),
};

const generateCreateUserDto = (): CreateUserDto => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

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
    const dto = generateCreateUserDto();

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
      createAt: now,
      updateAt: now,
      deleteAt: null,
    };
    expect(result).toEqual(expected);

    expect(result.verificationToken.length).toBe(
      numberOfCharactersUsedToGenerateUserValidationToken,
    );
    expect(mockUsersRepository.create).toHaveBeenCalled();
    expect(mockUsersRepository.create).toHaveBeenCalledWith(dto);
  });

  /*
  describe('getOneUser', () => {
    it('should return a User', async () => {
      const oneUser: User = {
        id: 'e450e7f7-c48d-4d81-8600-4eb8af284f41',
        username: 'alejmendez',
        email: 'alejmendez@gmail.com',
        password: 'qwerasdfzxcv',
        emailVerifiedAt: null,
        verificationToken:
          'iyfvPyU3vBfQPMI4fO1fCbjv6VxtzjGfez9faJRusQ3OQ4CaJRyCYXOKrmcBW7NA',
        isActive: true,
        createAt: new Date(),
        updateAt: new Date(),
        deleteAt: null,
      };
      usersRepository.findOneOrFail.mockResolvedValue(oneUser);
      expect(usersRepository.findOneOrFail).not.toHaveBeenCalled();

      jest
        .spyOn(usersRepository, 'findOneOrFail')
        .mockResolvedValueOnce(oneUser);

      const findOneOrFailSpy = jest.spyOn(usersRepository, 'findOneOrFail');
      const result = await service.findOne(oneUser.id);
      expect(result).toEqual(oneUser);

      expect(findOneOrFailSpy).toHaveBeenCalledTimes(1);
      expect(findOneOrFailSpy).toHaveBeenCalledWith(oneUser.id);
    });
  });
  */
});
