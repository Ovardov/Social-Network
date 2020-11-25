const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('./config');
const models = require('../models');

const saveUser = async (email, firstName, lastName, profilePictureUrl) => {
  try {
    // check for user with same email
    const foundedUser = await models.User.findOne({ email });

    if (!foundedUser) {
      // Get all symbols before @ from email
      let generatedUsername = email.split('@')[0].toLowerCase();

      // check users count with generated username
      const usersCountWithGeneratedUsername = await models.User.countDocuments({ username: { '$regex': generatedUsername } });

      if (usersCountWithGeneratedUsername > 1) {
        generatedUsername = `${generatedUsername}${usersCountWithGeneratedUsername}`;
      }

      let foundedUserWithGeneratedUsername = await models.User.findOne({ username: generatedUsername });

      // Add "1" in after username when generated username exist
      while (foundedUserWithGeneratedUsername) {
        generatedUsername += '1';
        foundedUserWithGeneratedUsername = await models.User.findOne({ username: generatedUsername });
      }

      // Create user profile
      const createdProfilePicture = await models.Image.create({ imageUrl: profilePictureUrl });
      await models.User.create({ email, username: generatedUsername, firstName, lastName, profilePicture: createdProfilePicture._id });
    }

  } catch (err) {
    throw new Error(err);
  }
}

const initPassport = () => {

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((userObject, cb) => cb(null, userObject));

  const facebookCallback = async (accessToken, refreshToken, user, cb) => {
    try {
      const userData = user._json;

      // get profile data from facebook
      const email = Array.isArray(userData.email) ? userData.email[0] : userData.email;
      const firstName = user._json.first_name;
      const lastName = user._json.last_name;
      const profilePictureUrl = user._json.picture.data.url;

      await saveUser(email, firstName, lastName, profilePictureUrl)

      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  };

  const googleCallback = async (accessToken, refreshToken, user, cb) => {
    try {
      const userData = user._json;

      // get profile data from google
      const email = Array.isArray(userData.email) ? userData.email[0] : userData.email;
      const firstName = user._json.given_name;
      const lastName = user._json.family_name;
      const profilePictureUrl = user._json.picture;

      await saveUser(email, firstName, lastName, profilePictureUrl)

      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  }

  passport.use(new FacebookStrategy(facebookConfig, facebookCallback));
  passport.use(new GoogleStrategy(googleConfig, googleCallback));
}

module.exports = initPassport