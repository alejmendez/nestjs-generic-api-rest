import { faker } from '@faker-js/faker';
import { Paginated } from 'nestjs-paginate';

import { User } from '../../entities/user.entity';
import { generateRandomString, hashPassword } from '../../../../common/utils';
import { Roles } from '../../../../modules/auth/models/roles.model';

export class UserFactory {
  async createPagination(count: number) {
    const users: User[] = await this.createList(count);

    const pagination: Paginated<User> = {
      data: users,
      meta: {
        itemsPerPage: 20,
        totalItems: users.length,
        currentPage: 1,
        totalPages: 1,
        sortBy: [],
        searchBy: [],
        search: '',
      },
      links: {
        current: '',
      },
    };

    return pagination;
  }

  async createList(count: number) {
    const list: User[] = [];
    for (let i = 0; i < count; i++) {
      list.push(await this.create());
    }

    return list;
  }

  async create(partial?: Partial<User>) {
    const user = new User(partial);

    user.username = faker.internet.userName().toLowerCase();
    user.email = faker.internet.email().toLowerCase();
    user.password = await hashPassword(faker.internet.password());
    user.emailVerifiedAt = new Date();
    user.isActive = faker.datatype.boolean();
    user.verificationToken = generateRandomString(20);
    user.role = faker.random.arrayElement(
      Object.keys(Roles).map((key) => Roles[key]),
    );

    return user;
  }
}
