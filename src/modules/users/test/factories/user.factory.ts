import * as faker from 'faker';
import { Paginated } from 'nestjs-paginate';

import { User } from '../../entities/user.entity';
import { generateRandomString, hashPassword } from '../../../../common/utils';

export class UserFactory {
  async createPagination(count: number): Promise<Paginated<User>> {
    const list: User[] = [];

    for (let i = 0; i < count; i++) {
      list.push(await this.create());
    }

    const pagination: Paginated<User> = {
      data: list,
      meta: {
        itemsPerPage: 20,
        totalItems: list.length,
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

    return new Promise((resolve) => {
      resolve(pagination);
    });
  }

  async create(partial?: Partial<User>): Promise<User> {
    const user = new User(partial);

    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = await hashPassword(faker.internet.password());
    user.emailVerifiedAt = new Date();
    user.isActive = faker.datatype.boolean();
    user.verificationToken = generateRandomString(20);

    return user;
  }
}
