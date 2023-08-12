"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../config/environment");
const index_1 = require("../utils/index");
describe('Valid functions utils', () => {
    test('Valid private key', () => {
        const event = {
            headers: {
                'x-private-key': '12345678'
            }
        };
        environment_1.CONFIG.APP.PRIVATE_KEY = '12345678';
        expect((0, index_1.validPrivateKey)(event)).toEqual(true);
    });
    test('get param id of request', () => {
        const event = {
            pathParameters: {
                id: 5
            }
        };
        expect((0, index_1.getParamIdOfEvent)(event)).toEqual(5);
    });
    test('get body of request is not null', () => {
        const event = {
            body: JSON.stringify({
                id: 5
            })
        };
        expect((0, index_1.getBodyOfEvent)(event)).not.toEqual(null);
    });
    test('generate custom uuid have length 16 character', () => {
        const uuid = (0, index_1.generateCustomUUID)();
        expect(uuid).toHaveLength(16);
    });
    test('get current date and years after', () => {
        const years = (0, index_1.getCurrentDateAndYearsAfter)(5);
        expect(years).toHaveLength(5);
    });
});
