import { createClient, RedisClientType } from 'redis';
import { CONFIG } from './environment';

export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${CONFIG.REDIS.HOST}:${CONFIG.REDIS.PORT}`,
    });
  }

  public async isOpen() {
    await this.client.connect();
    const isOpen = await this.client.isOpen;
    await this.client.disconnect();
    return isOpen;
  }

  public async set(key: string, value: string, timeExp: number): Promise<void> {
    await this.client.connect();
    await this.client.set(key, value, { EX: timeExp });
    await this.client.disconnect();
  }

  public async get(key: string): Promise<string | null> {
    await this.client.connect();
    const data = await this.client.get(key);
    await this.client.disconnect();
    return data;
  }
}
