import { define } from 'typeorm-seeding';

import { Roles } from '../../modules/auth/models/roles.model';
import { User } from '../../modules/users/entities/user.entity';

define(User, (faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);

  const user = new User();
  user.username = `${firstName}_${lastName}`;
  user.email = email;
  user.role = Roles.CUSTOMER;
  user.password = '12345678';

  return user;
});
