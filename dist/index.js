import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import { redisClient } from "./config/redis.js";
dotenv.config();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();
const app = express();
app.use(cors());
app.use("/api/v1/song", songRoutes);
app.get("/", (req, res) => {
    res.send("Song service is running");
});
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
//# sourceMappingURL=index.js.map