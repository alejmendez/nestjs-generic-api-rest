import * as Faker from 'faker';
import { Roles } from '../../../../modules/auth/models/roles.model';
import { CreateUserDto } from '../../dto';

const createUserDto = (): CreateUserDto => {
  return {
    username: Faker.internet.userName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
    role: Faker.random.arrayElement(
      Object.keys(Roles).map((key) => Roles[key]),
    ),
  };
};

export { createUserDto };
