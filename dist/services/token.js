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
exports.saveToken = exports.getToken = void 0;
const utils_1 = require("../utils");
const redis_1 = require("../config/redis");
const validation_1 = require("../validation");
const creditCardResponse_1 = require("../dto/creditCardResponse");
const constants_1 = require("../constants");
const getToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, utils_1.validPrivateKey)(event)) {
        return (0, utils_1.responseNotAuthorized)();
    }
    const redisService = new redis_1.RedisService();
    const tokenId = (0, utils_1.getParamIdOfEvent)(event);
    const { error } = (0, validation_1.tokenUuIdValidate)(tokenId);
    if (error) {
        return (0, utils_1.responseErrorValidation)(error);
    }
    const tokenString = (yield redisService.get(tokenId)) || '';
    if (!tokenString) {
        return (0, utils_1.responseNotFound)('token no encontrado');
    }
    const tokenData = (0, creditCardResponse_1.convertCreditCardResponse)(JSON.parse(tokenString));
    return (0, utils_1.responseSuccess)(tokenData, 'tokenData');
});
exports.getToken = getToken;
const saveToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, utils_1.validPrivateKey)(event)) {
        return (0, utils_1.responseNotAuthorized)();
    }
    const redisService = new redis_1.RedisService();
    const body = (0, utils_1.getBodyOfEvent)(event);
    body.card_number = body.card_number.toString();
    const { error } = (0, validation_1.creditCardRequestValidate)(body);
    if (error) {
        return (0, utils_1.responseErrorValidation)(error);
    }
    const generateUuId = (0, utils_1.generateCustomUUID)();
    yield redisService.set(generateUuId, JSON.stringify(body), constants_1.TIME_EXPIRATION_REDIS);
    return (0, utils_1.responseSuccess)(generateUuId, 'tokenID');
});
exports.saveToken = saveToken;
