import { CreditCardRequest } from './creditCardRequest';

export interface CreditCardResponse {
  email: string;
  card_number: number | string;
  expiration_month: string;
  expiration_year: string;
}

export const convertCreditCardResponse = (data: CreditCardRequest): CreditCardResponse => {
  return {
    email: data.email,
    card_number: data.card_number,
    expiration_month: data.expiration_month,
    expiration_year: data.expiration_year,
  };
};
