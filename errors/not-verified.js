const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class NotVerified extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.EXPECTATION_FAILED;
  }
}
class UserNotFound extends CustomAPIError {
  constructor() {
    super("User Not Found");
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = { NotVerified, UserNotFound };
