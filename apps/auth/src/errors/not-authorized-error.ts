import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode: number;
  reason: string;
  constructor() {
    super("Not authorized");
    this.statusCode = 401;
    this.reason = "Not authorized";
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
