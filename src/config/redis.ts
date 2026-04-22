import redis from "redis";

export const redisClient = redis.createClient({
  username: "default",
  password: process.env.REDIS_PASS as string,
  socket: {
    host: "redis-17741.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 17741,
  },
});
