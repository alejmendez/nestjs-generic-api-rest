import { startServer, closeServer, get } from '../../helpers';

describe('HealthController (e2e)', () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('/api/current/user (GET)', () => {
    return get('/api/current/user').expect(200).expect({
      status: 'ok',
    });
  });
});
