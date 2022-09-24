const express = require('express');
const router = express.Router()
const {
  signUp,
  verifyEmail,
  addPassword,
  login,
  resetPasswordCode,
  resetPassword,

} = require("../controllers/userAuth");

router.post('/signup', signUp)
router.post("/verify/:userId", verifyEmail);
router.put("/password/:userId", addPassword);
router.post("/login", login);
router.post("/reset-password-code", resetPasswordCode);
router.patch("/reset-password", resetPassword);

module.exports = router