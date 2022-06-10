import { startServer, closeServer, post } from '../../helpers';

describe('HealthController (e2e)', () => {
  beforeEach(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('/api/v1/register (POST)', () => {
    return post('/api/v1/register').expect(200).expect({
      status: 'ok',
    });
  });
});
