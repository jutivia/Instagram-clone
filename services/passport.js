const User = require("../models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

let user;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/user/google/sign-up/callback",
      passReqToCallback: true,
      proxy: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      ``;
      console.log(profile);
      try {
        const userName = profile.email.split("@")[0];
        const existingUser = User.findOne({ email: profile.email });
        if (existingUser) return done(null, existingUser);
        user = await new User({
          email: profile.email,
          fullName: `${profile.given_name} ${profile.family_name}`,
          DateOfBirth: profile.birthday,
          userName,
          userSignType: "googleId",
        }).save();
          console.log(user)
        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
