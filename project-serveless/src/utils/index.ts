import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4, v1 } from 'uuid';
import { CHARACTER_UUID, CHARACTER_UUID_LENGTH, HEADER_PRIVATE_KEY } from '../constants';
import { CONFIG } from '../config/environment';

export const getParamIdOfEvent = (event: APIGatewayProxyEvent) => {
  let employerId = '';
  if (event.pathParameters && event.pathParameters.id) {
    employerId = event.pathParameters.id;
  }
  return employerId;
};

export const getBodyOfEvent = (event: APIGatewayProxyEvent) => {
  return event.body ? JSON.parse(event.body) : null;
};

export const responseGeneral = (statusCode: number, data: any, message: string) => {
  return {
    statusCode,
    body: JSON.stringify({
      data,
      message,
    }),
  };
};

export const responseErrorValidation = (error: any) => {
  return responseGeneral(400, null, error.details[0].message);
};

export const responseError = (message: string) => {
  return responseGeneral(400, null, message);
};

export const responseNotFound = (message = 'Registro no encontrado') => {
  return responseGeneral(404, null, message);
};

export const responseErrorServerInternal = () => {
  return responseGeneral(500, null, 'Error interno del servidor');
};

export const responseNotAuthorized = () => {
  return responseGeneral(401, null, 'Peticion no autorizada');
};

export const responseSuccess = (data: any, message = '') => {
  return responseGeneral(200, data, message);
};

export const isArrayEmptyOrNull = (array: any[]) => {
  return !Array.isArray(array) || array.length === 0;
};

export const getCurrentDateAndYearsAfter = (countYearsAfter: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: countYearsAfter }, (_, index) => currentYear + index).map((year: number) =>
    year.toString()
  );
};

export const generateCustomUUID = () => {
  const characters = CHARACTER_UUID;
  const charactersLength = characters.length;
  let customUUID = '';

  for (let i = 0; i < CHARACTER_UUID_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    customUUID += characters.charAt(randomIndex);
  }

  return customUUID;
};

export const validPrivateKey = (event: APIGatewayProxyEvent) => {
  let privateKey = '';
  if (event.headers && event.headers[HEADER_PRIVATE_KEY]) {
    privateKey = event.headers[HEADER_PRIVATE_KEY];
  }
  return privateKey === CONFIG.APP.PRIVATE_KEY;
};
