import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'test', 'stag', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
  DB_CONNECTION: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_DATABASE: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  APP_DEBUG: Joi.bool(),
  APP_PORT: Joi.number(),
  APP_URL: Joi.string(),
  JWT_SECRET: Joi.string(),
  PAGINATION_LIMIT_DEFAULT: Joi.number().default(15),
});
