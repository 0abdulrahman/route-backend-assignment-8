import AppError from "../utils/appError.js";
export default function errorHandlingMiddleware(err, req, res, next) {
    var _a;
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    let error = new Error(err.message);
    Object.getOwnPropertyNames(error).forEach((key) => {
        if (key !== "message" && key !== "stack") {
            error[key] = error[key];
        }
    });
    error.stack = error.stack;
    if (err.name === "CastError") {
        error = new AppError(`The value [${error.value}] is invalid for [${error.path}]`, 400);
    }
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((err) => err.message);
        error = new AppError(`Invalid input data: \n- ${errors.join("\n- ")}`, 400);
    }
    if (err.code === 11000) {
        const value = ((_a = err.errmsg.match(/"([^"]*)"/g)) === null || _a === void 0 ? void 0 : _a[0]) || Object.keys((err === null || err === void 0 ? void 0 : err.keyValue) || { "one or more value": null }).join(" - ");
        error = new AppError(`Duplicate field value for (${value}). Please use another value!`, 400);
    }
    if (err.name === "JsonWebTokenError")
        error = new AppError("Invalid token, please login again!", 401);
    if (err.name === "TokenExpiredError")
        error = new AppError("Your token has expired, please login again!", 401);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}
//# sourceMappingURL=errorHandling.middleware.js.map