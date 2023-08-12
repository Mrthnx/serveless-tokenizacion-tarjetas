import * as Joi from 'joi';
import { CreditCardRequest } from '../dto/creditCardRequest';
import { getCurrentDateAndYearsAfter } from '../utils';
import { ALLOW_DOMAIN_EMAIL, MONTHS, REGEX_DOMAIN_EMAIL } from '../constants';

const creditCardRequestSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(100)
    .pattern(REGEX_DOMAIN_EMAIL)
    .required()
    .messages({
      'string.pattern.base': `La dirección de correo no es válida solo dominios: ${ALLOW_DOMAIN_EMAIL}`,
    }),
  card_number: Joi.string().creditCard().required(),
  cvv: Joi.number().min(100).max(9999).required(),
  expiration_month: Joi.string()
    .valid(...MONTHS)
    .required(),
  expiration_year: Joi.string()
    .valid(...getCurrentDateAndYearsAfter(5))
    .required(),
});

const tokenUuIdSchema = Joi.object({
  token: Joi.string().length(16),
});

export const creditCardRequestValidate = (creditCard: CreditCardRequest) => {
  return creditCardRequestSchema.validate(creditCard);
};

export const tokenUuIdValidate = (token: string) => {
  return tokenUuIdSchema.validate({ token });
};
