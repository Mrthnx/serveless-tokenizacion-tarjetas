export interface CreditCardRequest {
  email: string;
  card_number: number | string;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
}
