const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require("bcryptjs");
const {
  BadRequest,
  UnAuthorized,
  InternalServerError,
  NotVerified,
  UserNotFound,
} = require("../errors");
const UserVerification = require('../models/user-verfication')

const signUp = async (req, res) => {
  const { email, fullName, dob } = req.body
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequest('User already exists');
    const DOB = new Date(dob)
    const year = DOB.getFullYear()
    const currentYear = new Date().getFullYear()
    if (currentYear - year < 12)
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ msg: "User is too young to sign up on this app" });
    const userName = email.split('@')[0]
    const user = await User.create({
      email,
      fullName,
      DateOfBirth: DOB,
      userName,
      userSignType: 'email'
    });
    const done = await user.sendMail()
    if (!done) throw new InternalServerError('Server error')
    return res.status(StatusCodes.CREATED).json({msg: 'User email verification code sent sucessfully', userId: user._id })
}


const verifyEmail = async (req, res) => {
    const { uniqueCode } = req.body
    const {userId} = req.params
    const userVerification = await UserVerification.findOne({ userId })
    if (!userVerification) throw new BadRequest('User not found')
    const expirationTime = Math.floor(userVerification.expiresAt.getTime());
    const today = Date.now()
    if (today > expirationTime) return res.status(StatusCodes.PRECONDITION_FAILED).json({ msg: "Email verficication expired" })
     try {
       const verify = await bcrypt.compare(
         uniqueCode.toString(),
         userVerification.uniqueString
       );
       if (!verify) throw new NotVerified("Email verification failed");
       const user = await User.findOneAndUpdate(
         {
           _id: userId,
         },
         { verified: true },
         { new: true, runValidators: true }
       );
       if (!user) throw new UserNotFound()
       res.status(StatusCodes.ACCEPTED).json({ msg: "Email verfified successfully"});
     } catch (error) {
       throw new NotVerified("Email not verified");
     }
}

const addPassword = async (req, res) => {
   const {userId} = req.params
  const { password } = req.body;
  if (!password ) throw new BadRequest('Enter a password')
    if ( password &&
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
      throw new BadRequest(
        "Password should be at leats 8 characters, at least 1 uppercase and lower case letters, 1 number, and 1 symbol"
      );
         
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const user = await User.findOneAndUpdate(
     {
       _id: userId,
     },
     { password: hashedPassword },
     { new: true, runValidators: true }
   );
   const approved = user.verified;
   if (!approved) throw new NotVerified("Email not verified");
   const token = user.createJWT();
   res.status(StatusCodes.CREATED).json({
     msg: "Password created successfully",
     token,
     user: {
       name: user.fullName,
       username: user.userName,
       profile: user.profilePic,
       id: user._id
     },
   });
}


const login = async (req, res) => {
  const { email, password } = req.body
  if (!email) throw new BadRequest("Enter email");
  if (!password) throw new BadRequest("Enter password");
  const user = await User.findOne({ email })
  if (!user) throw new UserNotFound();
  const verifyPassword = await  bcrypt.compare(password, user.password);
  if (!verifyPassword) throw new BadRequest("Email-Password mismatch");
  const approved = user.verified;
  if (!approved) throw new NotVerified("Email not verified");
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    token,
    id: user._id,
    user: {
      name: user.fullName,
      username: user.userName,
      profile: user.profilePic,
      id: user._id,
    },
    msg: "user logged in successfully.",
  });
}

const resetPasswordCode = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) throw new UserNotFound()
  const done = await user.sendResetPasswordCode();
  if (!done) throw new InternalServerError("Server error");
  return res
    .status(StatusCodes.CREATED)
    .json({
      msg: "User password reset code sent sucessfully"
    });

}

const resetPassword = async (req, res) => {
  const { email, uniqueCode, password } = req.body
  if (!password) throw new BadRequest("Enter a password");
  const user = await User.findOne({ email });
  if (!user) throw new UserNotFound();
  const userVerification = await UserVerification.findOne({ userId: user._id });
  if (!userVerification) throw new UserNotFound();
  const expirationTime = Math.floor(userVerification.expiresAt.getTime());
  const today = Date.now();
  if (today > expirationTime)
    return res
      .status(StatusCodes.PRECONDITION_FAILED)
      .json({ msg: "Email verficication expired" });
  if (
    password &&
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  )
    throw new BadRequest(
      "Password should be at leats 8 characters, at least 1 uppercase and lower case letters, 1 number, and 1 symbol"
    );

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const verify = await bcrypt.compare(
      uniqueCode.toString(),
      userVerification.uniqueString
    );
    if (!verify) throw new NotVerified("Email verification failed");
    
    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Password updated succesfully" });
  } catch (error) {
    throw new NotVerified("Email not verified");
  }
}


module.exports = {
  signUp,
  verifyEmail,
  addPassword,
  login,
  resetPasswordCode,
  resetPassword
};
