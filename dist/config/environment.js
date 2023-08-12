"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
    },
    APP: {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
    },
};
