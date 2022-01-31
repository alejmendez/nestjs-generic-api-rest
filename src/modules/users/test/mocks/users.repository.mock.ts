import { User } from '../../entities/user.entity';
import { uuid } from '../../../../common/utils';
import { CreateUserDto } from '../../dto';

const now = new Date();

const createUserFromDto = (dto: CreateUserDto): User => {
  return {
    id: uuid(),
    username: dto.username.toLowerCase(),
    email: dto.email.toLowerCase(),
    password: '',
    emailVerifiedAt: null,
    verificationToken: uuid(),
    isActive: true,
    role: dto.role,
    createAt: now,
    updateAt: now,
    deleteAt: null,
  };
};
const createUserPromiseFromDto = (dto: CreateUserDto): Promise<User> => {
  return Promise.resolve(createUserFromDto(dto));
};

const mockUsersRepository = {
  create: jest.fn().mockImplementation((dto: CreateUserDto): Promise<User> => {
    return createUserPromiseFromDto(dto);
  }),
  save: jest.fn().mockImplementation((user): Promise<User> => {
    return createUserPromiseFromDto(user);
  }),
  findOneOrFail: jest.fn(),
  findOne: jest.fn(),
  merge: jest.fn(),
  softDelete: jest.fn(),
  update: jest.fn(),
};

export { mockUsersRepository };
