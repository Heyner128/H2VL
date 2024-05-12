import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  GITHUB_WEBHOOK_URL: Joi.string().required(),
  GITHUB_WEBHOOK_TOKEN: Joi.string().required(),
  PORT: Joi.number(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
});
