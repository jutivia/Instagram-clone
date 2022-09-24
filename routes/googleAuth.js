
const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
require('../services/passport')
const session = require('express-session')
// const { googleSuccess, googlee } = require("../controllers/googleAuth");
app.use(session({secret: 'cats'}))
app.use(passport.initialize());
app.use(passport.session())

function isLoggedIn(req, res, next) {
    req.user? next():res.send(401)
}
router.get(
  "/google/sign-up",
  passport.authenticate("google", { scope: ["email", "profile", 'https://www.googleapis.com/auth/user.birthday.read'] })
);
router.get("/google/sign-up/callback",
    passport.authenticate('google', {
        successRedirect: '/google/success',
        failureRedirect: '/google/failure'
    })
)

router.get('/google/success', (req, res) => {
    res.status(200).json({ msg: 'Google signup successful', user: req.user });
})
router.get("/google/failure", (req, res) => {
    res.status(404).json({ msg: "Google signup Failed" });
});
router.get('/logout', (req, res) => {
    req.logout();
    res.status(404),json({msg: 'Logout successful'})
})
module.exports = router