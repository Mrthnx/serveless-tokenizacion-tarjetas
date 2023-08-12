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
exports.RedisService = void 0;
const redis_1 = require("redis");
const environment_1 = require("./environment");
class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: `redis://${environment_1.CONFIG.REDIS.HOST}:${environment_1.CONFIG.REDIS.PORT}`,
        });
    }
    isOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const isOpen = yield this.client.isOpen;
            yield this.client.disconnect();
            return isOpen;
        });
    }
    set(key, value, timeExp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            yield this.client.set(key, value, { EX: timeExp });
            yield this.client.disconnect();
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const data = yield this.client.get(key);
            yield this.client.disconnect();
            return data;
        });
    }
}
exports.RedisService = RedisService;
