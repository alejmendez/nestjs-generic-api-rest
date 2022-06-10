import * as Faker from 'faker';
import { Paginated } from 'nestjs-paginate';

import { User } from '../../modules/users/entities/user.entity';
import { generateRandomString, hashPassword } from '../../common/utils';
import { Roles } from '../../modules/auth/models/roles.model';

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

    user.username = user.username || Faker.internet.userName().toLowerCase();
    user.email = user.email || Faker.internet.email().toLowerCase();
    user.password =
      user.password || (await hashPassword(Faker.internet.password()));
    user.emailVerifiedAt = user.emailVerifiedAt || new Date();
    user.isActive = user.isActive || Faker.datatype.boolean();
    user.verificationToken = user.verificationToken || generateRandomString(20);
    user.role =
      user.role ||
      Faker.random.arrayElement(Object.keys(Roles).map((key) => Roles[key]));

    return user;
  }

  async createAdmin(partial?: Partial<User>) {
    return await this.create({
      ...partial,
      role: Roles.ADMIN,
    });
  }
}
