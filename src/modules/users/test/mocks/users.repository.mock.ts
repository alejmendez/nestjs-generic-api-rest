import { PaginateQuery } from 'nestjs-paginate';
import { UserFactory } from '../factories/user.factory';
import { CreateUserDto } from '../../dto';
import { User } from '../../entities/user.entity';
import { generateRandomString, uuid } from '../../../../common/utils';

const now = new Date();

const userFactory = new UserFactory();

const createUserFromDto = (dto: CreateUserDto): User => {
  return {
    id: uuid(),
    username: dto.username,
    email: dto.email,
    password: dto.password,
    emailVerifiedAt: now,
    verificationToken: generateRandomString(64),
    isActive: true,
    role: dto.role,
    createAt: now,
    updateAt: now,
    deleteAt: null,
  };
};

const mockUsersRepository = {
  findAll: jest.fn(async (query: PaginateQuery) => {
    return await userFactory.createPagination(query.limit || 10);
  }),
  findOne: jest.fn(async (id: string) => {
    return await userFactory.create({ id });
  }),
  findOneOrFail: jest.fn(async (id: string) => {
    return await userFactory.create({ id });
  }),
  create: jest
    .fn()
    .mockImplementation((dto: CreateUserDto) =>
      Promise.resolve(createUserFromDto(dto)),
    ),
  save: jest.fn().mockImplementation((user: User) => Promise.resolve(user)),
  merge: jest.fn(),
  softDelete: jest.fn(),
  update: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  take: jest.fn().mockImplementation(function (_: number) {
    return this;
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  skip: jest.fn().mockImplementation(function (_: number) {
    return this;
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addOrderBy: jest.fn().mockImplementation(function (_: string) {
    return this;
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getManyAndCount: jest.fn().mockImplementation(async (_: string) => {
    const items = await userFactory.createList(10);
    const totalItems = items.length;
    return [items, totalItems];
  }),
};

export { mockUsersRepository };
