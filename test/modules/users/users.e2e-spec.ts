import { UserFactory } from '../../../src/database/factories/user.factory';
import { User } from '../../../src/modules/users/entities/user.entity';
import {
  startServer,
  closeServer,
  get,
  post,
  put,
  del,
  generateJwt,
  setHeaders,
} from '../../helpers';

describe('Users Module (e2e)', () => {
  let admin: User;
  beforeAll(async () => {
    await startServer();

    const userFactory = new UserFactory();
    await userFactory.createList(6);
    admin = await userFactory.createAdmin();
  });

  afterAll(async () => {
    await closeServer();
  });

  describe('with auth', () => {
    const jwt = generateJwt(admin);
    setHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    });
    it('/api/v1/users (GET) List users', () => {
      const res = get('/api/v1/users');
      res
        .expect(200)
        .expect({
          status: 'ok',
        })
        .expect((res) => {
          console.log({ body: res.body });
        });
    });

    it('/api/v1/users/:id (GET) Get an users', () => {
      get('/api/v1/users').expect(200).expect({
        status: 'ok',
      });
    });

    it('/api/v1/users (POST) Create an user', () => {
      post('/api/v1/users').expect(201).expect({
        status: 'ok',
      });
    });

    it('/api/v1/users/:id (PUT) Update an user', () => {
      put('/api/v1/users').expect(200).expect({
        status: 'ok',
      });
    });

    it('/api/v1/users/:id (DELETE) Delete an user', () => {
      del('/api/v1/users').expect(200).expect({
        status: 'ok',
      });
    });
  });

  describe('without auth', () => {
    it('/api/v1/users (GET) List users', () => {
      get('/api/v1/users').expect(200).expect({
        status: 'ok',
      });
    });
  });
});
