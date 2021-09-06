import * as faker from 'faker';
import { Paginated } from 'nestjs-paginate';
import { User } from '../entities/user.entity';

export class UserFactory {
  createPagination(count: number): Promise<Paginated<User>> {
    const list = [];

    for (let i = 0; i < count; i++) {
      list.push(this.create());
    }

    const pagination: Paginated<User> = {
      data: list,
      meta: {
        itemsPerPage: 20,
        totalItems: list.length,
        currentPage: 1,
        totalPages: 1,
        sortBy: [],
        search: '',
      },
      links: {
        current: '',
      },
    };

    return new Promise((resolve) => {
      resolve(pagination);
    });
  }
  create(partial?: Partial<User>): User {
    const user = new User(partial);

    faker.seed(new Date().getTime());

    user.username = faker.name.firstName();
    user.email = faker.name.firstName();
    user.password = faker.name.firstName();
    user.emailVerifiedAt = faker.date.past();
    user.verificationToken = faker.name.firstName();
    user.isActive = faker.datatype.boolean();
    return user;
  }
}
