import { RedisService } from '../config/redis';
describe('Valid configuration redis', ()=>{

    test('valid creation redis', async ()=> {
        const redisService = new RedisService();
        const isOpen = await redisService.isOpen();
        expect(isOpen).toEqual(true);
    })

    test('save item redis', async()=>{
        const redisService = new RedisService();
        await redisService.set('item', 'value', 1); 
        const item = await redisService.get('item')
        expect(item).toEqual('value');
    })

    test('expiration item redis', async()=>{
        const redisService = new RedisService();
        await redisService.set('item', 'value', 1); 
        const item = await new Promise(resolve => {
            let item;
            setTimeout(async()=>{
                item = await redisService.get('item')
                resolve(item);
            }, 1*1000) // segundos
        });
        expect(item).toEqual(null);
    })
})