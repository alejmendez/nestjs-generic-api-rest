import { startServer, closeServer, post } from '../../helpers';

describe('HealthController (e2e)', () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('/api/register (POST)', () => {
    return post('/api/register').expect(200).expect({
      status: 'ok',
    });
  });
});
