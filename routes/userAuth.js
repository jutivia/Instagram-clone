const express = require('express');
const router = express.Router()
const auth = require("../middlewares/authorization");
const app = express();
const {
  signUp,
  verifyEmail,
  updateProfile,
  addPassword,
  login,
  resetPasswordCode,
  resetPassword,
} = require("../controllers/userAuth");

router.post('/signup', signUp)
router.post("/verify/:userId", verifyEmail);
router.put("/:userId/password", addPassword);
app.use(router.put("/update-profile", [auth, updateProfile]));
router.post("/login", login);
router.post("/reset-password-code", resetPasswordCode);
router.patch("/reset-password", resetPassword);
module.exports = router