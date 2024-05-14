import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  GITHUB_WEBHOOK_URL: Joi.string().uri().required(),
  GITHUB_WEBHOOK_TOKEN: Joi.string().required(),
  PORT: Joi.number(),
  HOSTNAME_URL: Joi.string().uri().required(),
  MAIL_SENDER: Joi.string().email().required(),
  CONTACT_FORM_RECEIVER: Joi.string().email().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
});
