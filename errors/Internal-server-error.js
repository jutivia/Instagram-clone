const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

class InternalServerError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
module.exports = InternalServerError;
