const BadRequest = require('./bad-request')
const UnAuthorized = require('./un-authorized')
const InternalServerError = require('./Internal-server-error')
const { NotVerified, UserNotFound } = require('./not-verified')
const { UnauthenticatedError} = require('./unauthenticated-error')
module.exports = {
  BadRequest,
  UnAuthorized,
  InternalServerError,
  NotVerified,
  UserNotFound,
  UnauthenticatedError,
};