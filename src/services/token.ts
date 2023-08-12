import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  generateCustomUUID,
  getBodyOfEvent,
  getParamIdOfEvent,
  responseErrorValidation,
  responseNotAuthorized,
  responseNotFound,
  responseSuccess,
  validPrivateKey,
} from '../utils';
import { RedisService } from '../config/redis';
import { CreditCardRequest } from '../dto/creditCardRequest';
import { creditCardRequestValidate, tokenUuIdValidate } from '../validation';
import { convertCreditCardResponse } from '../dto/creditCardResponse';
import { TIME_EXPIRATION_REDIS } from '../constants';

export const getToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validPrivateKey(event)) {
    return responseNotAuthorized();
  }
  const redisService = new RedisService();
  const tokenId = getParamIdOfEvent(event);
  const { error } = tokenUuIdValidate(tokenId);
  if (error) {
    return responseErrorValidation(error);
  }
  const tokenString = (await redisService.get(tokenId)) || '';
  if (!tokenString) {
    return responseNotFound('token no encontrado');
  }
  const tokenData = convertCreditCardResponse(JSON.parse(tokenString));
  return responseSuccess(tokenData, 'tokenData');
};

export const saveToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validPrivateKey(event)) {
    return responseNotAuthorized();
  }
  const redisService = new RedisService();
  const body = getBodyOfEvent(event) as CreditCardRequest;
  body.card_number = body.card_number.toString();
  const { error } = creditCardRequestValidate(body);

  if (error) {
    return responseErrorValidation(error);
  }
  const generateUuId = generateCustomUUID();
  await redisService.set(generateUuId, JSON.stringify(body), TIME_EXPIRATION_REDIS);
  return responseSuccess(generateUuId, 'tokenID');
};
