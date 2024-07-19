import AppError from "../utils/appError.js";
export default function (req, res, next) {
    const err = new AppError(`The route ${req.originalUrl} you requested does not exist on the server.`, 404);
    next(err);
}
//# sourceMappingURL=notFoundRoute.middleware.js.map