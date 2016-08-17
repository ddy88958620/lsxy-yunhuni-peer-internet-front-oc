import Redis from "ioredis"
const config = require('../config')

export default class RedisStore  {
	constructor() {
		this.redis = new Redis(config.REDISPORT,config.REDISHOST);
	}
	
	async get(sid) {
		return await this.redis.get(sid)
	}
	
	async set(session, value) {
		await this.redis.set(session, value);
		//await this.redis.expire(session,1800);
		return session;
	}
	
	async destroy(sid) {
		return await this.redis.del(sid);
	}
}