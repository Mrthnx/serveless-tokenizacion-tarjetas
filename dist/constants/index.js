"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_PRIVATE_KEY = exports.CHARACTER_UUID_LENGTH = exports.CHARACTER_UUID = exports.REGEX_DOMAIN_EMAIL = exports.ALLOW_DOMAIN_EMAIL = exports.MONTHS = exports.TIME_EXPIRATION_REDIS = void 0;
exports.TIME_EXPIRATION_REDIS = 15 * 60; // segundos
exports.MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
exports.ALLOW_DOMAIN_EMAIL = ['gmail.com', 'hotmail.com', 'yahoo.es'];
exports.REGEX_DOMAIN_EMAIL = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.es|hotmail\.com)$/;
exports.CHARACTER_UUID = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
exports.CHARACTER_UUID_LENGTH = 16;
exports.HEADER_PRIVATE_KEY = 'x-private-key';
