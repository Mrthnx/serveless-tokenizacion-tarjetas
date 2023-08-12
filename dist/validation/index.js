"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenUuIdValidate = exports.creditCardRequestValidate = void 0;
const Joi = require("joi");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const creditCardRequestSchema = Joi.object({
    email: Joi.string()
        .min(5)
        .max(100)
        .pattern(constants_1.REGEX_DOMAIN_EMAIL)
        .required()
        .messages({
        'string.pattern.base': `La dirección de correo no es válida solo dominios: ${constants_1.ALLOW_DOMAIN_EMAIL}`,
    }),
    card_number: Joi.string().creditCard().required(),
    cvv: Joi.number().min(100).max(9999).required(),
    expiration_month: Joi.string()
        .valid(...constants_1.MONTHS)
        .required(),
    expiration_year: Joi.string()
        .valid(...(0, utils_1.getCurrentDateAndYearsAfter)(5))
        .required(),
});
const tokenUuIdSchema = Joi.object({
    token: Joi.string().length(16),
});
const creditCardRequestValidate = (creditCard) => {
    return creditCardRequestSchema.validate(creditCard);
};
exports.creditCardRequestValidate = creditCardRequestValidate;
const tokenUuIdValidate = (token) => {
    return tokenUuIdSchema.validate({ token });
};
exports.tokenUuIdValidate = tokenUuIdValidate;
