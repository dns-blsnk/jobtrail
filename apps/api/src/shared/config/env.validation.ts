import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  API_PORT: Joi.number().default(4001),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES: Joi.string().default('7d'),
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(5),
  THROTTLE_ENABLED: Joi.string().valid('true', 'false').default('true'),
  ALLOWED_ORIGINS: Joi.string().default('http://localhost:3000'),
});
