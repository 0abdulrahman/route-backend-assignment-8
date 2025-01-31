export default class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = this.statusCode.toString().startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}
