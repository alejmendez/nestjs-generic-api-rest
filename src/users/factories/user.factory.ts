import * as faker from 'faker';
import { User } from '../entities/user.entity';

export class UserFactory {
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
