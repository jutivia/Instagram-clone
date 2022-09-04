const { StatusCodes } = require('http-status-codes')
const errorHandler = (req, res, next, err) => {
    
    const errHolder = {
        status: err.statusCode || err.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Server error, Try again later"
    }

    return res.status(errHolder.status).json({msg: erHolder.msg})
}
module.exports = errorHandler;