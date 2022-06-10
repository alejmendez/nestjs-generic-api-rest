import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserFactory } from '../../../../database/factories/user.factory';
import { User } from '../../entities/user.entity';
import { uuid } from '../../../../common/utils';

const userFactory = new UserFactory();

const mockUsersService = {
  findAll: jest.fn((query: PaginateQuery): Promise<Paginated<User>> => {
    return userFactory.createPagination(query.limit || 10);
  }),
  findOne: jest.fn((id: string): Promise<User> => {
    return userFactory.create({ id });
  }),
  findOneByEmail: jest.fn(),
  existUserWithEmail: jest.fn(),
  create: jest.fn((dto) => {
    return {
      id: uuid(),
      ...dto,
    };
  }),
  update: jest.fn().mockImplementation((id, dto) => {
    return {
      id,
      ...dto,
    };
  }),
  remove: jest.fn((id: string): Promise<User> => {
    return userFactory.create({ id });
  }),
  verify: jest.fn(),
  generateRandomString: jest.fn(),
};

export { mockUsersService };
