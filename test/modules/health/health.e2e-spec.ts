import { startServer, closeServer, get } from '../../helpers';

describe('HealthController (e2e)', () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await closeServer();
  });

  it('/api/health (GET)', () => {
    return get('/api/health').expect(200).expect({
      status: 'ok',
    });
  });
});
