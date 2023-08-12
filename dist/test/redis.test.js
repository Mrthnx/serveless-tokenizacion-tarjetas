"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../config/redis");
describe('Valid configuration redis', () => {
    test('valid creation redis', () => __awaiter(void 0, void 0, void 0, function* () {
        const redisService = new redis_1.RedisService();
        const isOpen = yield redisService.isOpen();
        expect(isOpen).toEqual(true);
    }));
    test('save item redis', () => __awaiter(void 0, void 0, void 0, function* () {
        const redisService = new redis_1.RedisService();
        yield redisService.set('item', 'value', 1);
        const item = yield redisService.get('item');
        expect(item).toEqual('value');
    }));
    test('expiration item redis', () => __awaiter(void 0, void 0, void 0, function* () {
        const redisService = new redis_1.RedisService();
        yield redisService.set('item', 'value', 1);
        const item = yield new Promise(resolve => {
            let item;
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                item = yield redisService.get('item');
                resolve(item);
            }), 1 * 1000); // segundos
        });
        expect(item).toEqual(null);
    }));
});
