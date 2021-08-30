import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      connection: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    debug: process.env.APP_DEBUG,
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,
    jwtSecret: process.env.JWT_SECRET,
    pagination: {
      limit: process.env.PAGINATION_LIMIT_DEFAULT,
    },
  };
});
