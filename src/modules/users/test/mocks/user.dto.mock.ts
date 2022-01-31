import { faker } from '@faker-js/faker';
import { Roles } from '../../../../modules/auth/models/roles.model';
import { CreateUserDto } from '../../dto';

const createUserDto = (): CreateUserDto => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.helpers.randomize(Object.keys(Roles).map((key) => Roles[key])),
});

export { createUserDto };
