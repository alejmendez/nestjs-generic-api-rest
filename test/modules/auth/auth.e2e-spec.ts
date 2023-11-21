import { startServer, closeServer, post } from '../../helpers';

describe('AuthController (e2e)', () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('with a user that does not exist login should return error 401', async () => {
    await post('/api/auth/login', {
      email: 'alejmendez.87@gmail.com',
      password: 'password',
    })
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'not allow',
      });
  });
});
