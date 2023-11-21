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
} from '../../helpers';

describe('Users Module /api/users (e2e)', () => {
  let admin: User;
  let jwt = '';
  beforeAll(async () => {
    await startServer();

    const userFactory = new UserFactory();
    await userFactory.createList(6);
    admin = await userFactory.createAdmin();
    jwt = generateJwt(admin);
  });

  afterAll(async () => {
    await closeServer();
  });

  describe('with auth', () => {
    it('List users', () => {
      const res = get('/api/users').set('Authorization', `Bearer ${jwt}`);
      return res
        .expect(200)
        .expect({
          status: 'ok',
        })
        .expect((res) => {
          console.log({ body: res.body });
        });
    });

    it('/api/users/:id (GET) Get an users', () => {
      return get('/api/users')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect({
          status: 'ok',
        });
    });

    it('/api/users (POST) Create an user', () => {
      return post('/api/users')
        .send({
          username: 'alejmendez',
          email: 'alejmendez@gmail.com',
          password: 'qwer1234',
          role: 'admin',
        })
        .set('Authorization', `Bearer ${jwt}`)
        .expect(201)
        .expect({
          status: 'ok',
        });
    });

    it('/api/users/:id (PUT) Update an user', () => {
      return put('/api/users')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect({
          status: 'ok',
        });
    });

    it('/api/users/:id (DELETE) Delete an user', () => {
      return del('/api/users')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect({
          status: 'ok',
        });
    });
  });

  describe('without auth', () => {
    it('/api/users (GET) List users', () => {
      return get('/api/users').expect(401);
    });
  });
});
