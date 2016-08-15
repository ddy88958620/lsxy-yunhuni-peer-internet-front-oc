import Redis from "ioredis"

export default class RedisStore  {
	constructor() {
		this.redis = new Redis();
	}
	
	async get(sid) {
		return await this.redis.get(`SESSION:${sid}`);
	}
	
	async set(session, value) {
		await this.redis.set(session, 'value' , 'ex', 10);
		return session;
	}
	
	async destroy(sid) {
		return await this.redis.del(`SESSION:${sid}`);
	}
}