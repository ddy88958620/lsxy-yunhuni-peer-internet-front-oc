import Redis from "ioredis"

export default class RedisStore  {
	constructor() {
		this.redis = new Redis();
	}
	
	async get(sid) {
		return await this.redis.get(sid)
	}
	
	async set(session, value) {
		await this.redis.set(session, value , 'ex', 1800);
		return session;
	}
	
	async destroy(sid) {
		return await this.redis.del(sid);
	}
}