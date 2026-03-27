import axios from "axios";
import { asyncHandler } from "./asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = asyncHandler(async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        throw new AppError("Please Login", 403);
    }
    const { data } = await axios.get(`${process.env.USER_URL}/api/v1/user/me`, {
        headers: {
            token,
        },
    });
    req.user = data;
    next();
});
//# sourceMappingURL=authentication.js.map