const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { facebookConfig } = require('./config');
const models = require('../models');


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

      // check for user with same email
      const foundedUser = await models.User.findOne({ email });

      if(!foundedUser) {
        let generatedUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

        // check users count with generated username
        const usersCountWithGeneratedUsername = await models.User.countDocuments({ username: { '$regex': generatedUsername} });

        if(usersCountWithGeneratedUsername > 1) {
          generatedUsername = `${generatedUsername}${usersCountWithGeneratedUsername}`;
        }

        let foundedUserWithGeneratedUsername = await models.User.findOne({ username: generatedUsername });

        // Add "1" in after username when generated username exist
        while(foundedUserWithGeneratedUsername) {
          generatedUsername += '1';
          foundedUserWithGeneratedUsername = await models.User.findOne({ username: generatedUsername });
        }

        // Create user profile
        const createdProfilePicture = await models.Image.create({ imageUrl: profilePictureUrl });
        await models.User.create({ email, username: generatedUsername, firstName, lastName, profilePicture: createdProfilePicture._id });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  };



  passport.use(new FacebookStrategy(facebookConfig, facebookCallback));
}

module.exports = initPassport