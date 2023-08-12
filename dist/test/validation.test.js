"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../validation/index");
describe('Valid function validate', () => {
    test('send token of request is valid', () => {
        const { error } = (0, index_1.tokenUuIdValidate)('AGuX8AupQmVAFcva');
        expect(error).toEqual(undefined);
    });
    test('send credit cad is valid', () => {
        const crediCard = {
            card_number: '4558950018068423',
            cvv: 123,
            email: 'mail@gmail.com',
            expiration_year: '2023',
            expiration_month: '1'
        };
        const { error } = (0, index_1.creditCardRequestValidate)(crediCard);
        expect(error).toEqual(undefined);
    });
});
