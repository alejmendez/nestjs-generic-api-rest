import { startServer, closeServer, get } from '../../helpers';

describe('HealthController (e2e)', () => {
  beforeEach(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('/api/v1/current/user (GET)', () => {
    return get('/api/v1/current/user').expect(200).expect({
      status: 'ok',
    });
  });
});
