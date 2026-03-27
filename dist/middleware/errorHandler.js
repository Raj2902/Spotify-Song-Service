import { AppError } from "../utils/AppError.js";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res
        .status(500)
        .json({ message: err.message || "Internal Server Error" });
};
//# sourceMappingURL=errorHandler.js.map