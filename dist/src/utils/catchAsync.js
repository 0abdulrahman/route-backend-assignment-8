export default function catchAsync(asyncFunction) {
    return (req, res, next) => {
        asyncFunction(req, res, next).catch(next);
    };
}
//# sourceMappingURL=catchAsync.js.map