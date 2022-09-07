const { StatusCodes } = require('http-status-codes')
const errorHandler = (err, req, res, next) => {
    // console.log(err)
    const errHolder = {
      status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || "Server error, Try again later",
    };
    if (err.name === "ValidationError") errHolder.statusCode = StatusCodes.BAD_REQUEST;
    if (err.name === "CastError") errHolder.statusCode = StatusCodes.BAD_REQUEST;
    if (err.code === 11000) errHolder.statusCode = StatusCodes.BAD_REQUEST;

    return res.status(errHolder.status).json({msg: errHolder.msg})
}
module.exports = errorHandler;