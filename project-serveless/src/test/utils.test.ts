import { CONFIG } from '../config/environment';
import { generateCustomUUID, getBodyOfEvent, getCurrentDateAndYearsAfter, getParamIdOfEvent, validPrivateKey } from '../utils/index';

describe('Valid functions utils', ()=> {

    test('Valid private key', ()=> {
        const event = {
            headers: {
                'x-private-key': '12345678'
            }
        } as any;
        CONFIG.APP.PRIVATE_KEY = '12345678';
        expect(validPrivateKey(event)).toEqual(true)

    })

    test('get param id of request', ()=>{
        const event = {
            pathParameters: {
                id: 5
            }
        } as any;
        expect(getParamIdOfEvent(event)).toEqual(5)

    })

    test('get body of request is not null', ()=>{
        const event = {
            body: JSON.stringify({
                id: 5
            })
        } as any;
        expect(getBodyOfEvent(event)).not.toEqual(null)
    })

    test('generate custom uuid have length 16 character', ()=>{
        const uuid = generateCustomUUID();
        expect(uuid).toHaveLength(16)
    })

    test('get current date and years after', ()=>{
        const years = getCurrentDateAndYearsAfter(5);
        expect(years).toHaveLength(5)
    })

})  