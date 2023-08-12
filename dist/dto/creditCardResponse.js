"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCreditCardResponse = void 0;
const convertCreditCardResponse = (data) => {
    return {
        email: data.email,
        card_number: data.card_number,
        expiration_month: data.expiration_month,
        expiration_year: data.expiration_year,
    };
};
exports.convertCreditCardResponse = convertCreditCardResponse;
