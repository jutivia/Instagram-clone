const BadRequest = require('../errors/bad-request')
const notFound = (req, res, next) => {
    throw new BadRequest('Route not found');
}
module.exports = notFound;