
const { OAuth2Client } = require("google-auth-library");
const http = require("http");
const url = require("url");
const open = require("open");
const destroyer = require("server-destroy");


const successSignUp = (req, res) => {
    
}

const failureSignUp = (req, res) => {
   throw new BadRequest('Google signup failed');
};

module.exports = { successSignUp, failureSignUp };