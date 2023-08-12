import { CreditCardRequest } from '../dto/creditCardRequest';
import { tokenUuIdValidate, creditCardRequestValidate } from '../validation/index';
describe('Valid function validate', ()=>{

    test('send token of request is valid', ()=>{
      const { error } = tokenUuIdValidate('AGuX8AupQmVAFcva');
      expect(error).toEqual(undefined)
    })

    test('send credit cad is valid', ()=>{
        const crediCard = {
            card_number: '4558950018068423',
            cvv: 123,
            email: 'mail@gmail.com',
            expiration_year: '2023',
            expiration_month: '1'
        } as CreditCardRequest;
        const { error } = creditCardRequestValidate(crediCard);
        expect(error).toEqual(undefined)
      })

})