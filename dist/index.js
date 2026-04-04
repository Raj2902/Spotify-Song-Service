import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import redis from "redis";
import cors from "cors";
dotenv.config();
export const redisClient = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: "redis-17741.c301.ap-south-1-1.ec2.cloud.redislabs.com",
        port: 17741,
    },
});
redisClient
    .connect()
    .then(() => {
    console.log("connected to redis");
})
    .catch(console.error);
const app = express();
app.use(cors());
app.use("/api/v1", songRoutes);
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
//# sourceMappingURL=index.js.map