"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPrivateKey = exports.generateCustomUUID = exports.getCurrentDateAndYearsAfter = exports.isArrayEmptyOrNull = exports.responseSuccess = exports.responseNotAuthorized = exports.responseErrorServerInternal = exports.responseNotFound = exports.responseError = exports.responseErrorValidation = exports.responseGeneral = exports.getBodyOfEvent = exports.getParamIdOfEvent = void 0;
const constants_1 = require("../constants");
const environment_1 = require("../config/environment");
const getParamIdOfEvent = (event) => {
    let employerId = '';
    if (event.pathParameters && event.pathParameters.id) {
        employerId = event.pathParameters.id;
    }
    return employerId;
};
exports.getParamIdOfEvent = getParamIdOfEvent;
const getBodyOfEvent = (event) => {
    return event.body ? JSON.parse(event.body) : null;
};
exports.getBodyOfEvent = getBodyOfEvent;
const responseGeneral = (statusCode, data, message) => {
    return {
        statusCode,
        body: JSON.stringify({
            data,
            message,
        }),
    };
};
exports.responseGeneral = responseGeneral;
const responseErrorValidation = (error) => {
    return (0, exports.responseGeneral)(400, null, error.details[0].message);
};
exports.responseErrorValidation = responseErrorValidation;
const responseError = (message) => {
    return (0, exports.responseGeneral)(400, null, message);
};
exports.responseError = responseError;
const responseNotFound = (message = 'Registro no encontrado') => {
    return (0, exports.responseGeneral)(404, null, message);
};
exports.responseNotFound = responseNotFound;
const responseErrorServerInternal = () => {
    return (0, exports.responseGeneral)(500, null, 'Error interno del servidor');
};
exports.responseErrorServerInternal = responseErrorServerInternal;
const responseNotAuthorized = () => {
    return (0, exports.responseGeneral)(401, null, 'Peticion no autorizada');
};
exports.responseNotAuthorized = responseNotAuthorized;
const responseSuccess = (data, message = '') => {
    return (0, exports.responseGeneral)(200, data, message);
};
exports.responseSuccess = responseSuccess;
const isArrayEmptyOrNull = (array) => {
    return !Array.isArray(array) || array.length === 0;
};
exports.isArrayEmptyOrNull = isArrayEmptyOrNull;
const getCurrentDateAndYearsAfter = (countYearsAfter) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: countYearsAfter }, (_, index) => currentYear + index).map((year) => year.toString());
};
exports.getCurrentDateAndYearsAfter = getCurrentDateAndYearsAfter;
const generateCustomUUID = () => {
    const characters = constants_1.CHARACTER_UUID;
    const charactersLength = characters.length;
    let customUUID = '';
    for (let i = 0; i < constants_1.CHARACTER_UUID_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        customUUID += characters.charAt(randomIndex);
    }
    return customUUID;
};
exports.generateCustomUUID = generateCustomUUID;
const validPrivateKey = (event) => {
    let privateKey = '';
    if (event.headers && event.headers[constants_1.HEADER_PRIVATE_KEY]) {
        privateKey = event.headers[constants_1.HEADER_PRIVATE_KEY];
    }
    return privateKey === environment_1.CONFIG.APP.PRIVATE_KEY;
};
exports.validPrivateKey = validPrivateKey;
