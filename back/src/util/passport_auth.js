const express		      = require('express');
const router		      = require('express').Router();
const User            = require('../model/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
//const currentUser = require('../util/check');
const FortyTwoStrategy = require('passport-42').Strategy;


const GOOGLE_APP_ID = '669911811352-bdsbd20jmanch9e915t6ig1atn7c6lu2.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = 'CdYCIdfJZ32cP6COig1dcchm';

module.exprots = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  /**GOOGLE PASSPORT AUTH */
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/google/redirect"
  }, (accessToken, refreshToken, profile, done) => {
      console.log('passport callback');
      console.log(profile);
      var firstname = profile._json.name.givenName;
      var lastname = profile._json.name.familyName;
      var email = profile._json.emails[0].value;
      var profile_picture = profile._json.image.url.slice(0, -2) + '200';

      User.findOne( { googleId: profile.id}).then((currentUser) => {
        if (currentUser) {
          console.log('user already exist', currentUser);
          done(null, currentUser);
        } else {
          Users.findOneAndUpdate({"email": email} , {$set: {"googleID": profile.id}}, {new: true}).then(user => {
            if (currentUser) 
              done(null, currentUser)
            else {
              new Users({
                "firstname": firstname, 
                "lastname": lastname, 
                "username": firstname + tools.getRandomArbitrary(0, 1000), 
                "email": email, 
                "googleID": profile.id, 
                "profile_picture": profile_picture
              })
              .save()
              .then(user => done(null, currentUser)); }
               });
        }
      }
    )}
  ));

  /**42 PASSPORT AUTH */
passport.use(new FortyTwoStrategy({
        clientID: '7f41faded62b4fbbe0b2cc08a72029cc05c590f8cb56edc954382350ee0a4536',
        clientSecret: '846a2c3199eaf6314c1c7ec88079fa4872e86631442d760278b058c86229ffff',
        callbackURL: "http://localhost:4200/auth/42/redirect"
        },
        function(accessToken, refreshToken, profile, done) {
            var firstname = profile._json.first_name;
            var lastname = profile._json.last_name;
            var email = profile._json.email;
            var profile_picture = profile._json.image_url;

            Users.findOne({"fortytwoID": profile._json.id}).then(user => {
                if(user) {
                    done(null, user);
                } else {
                    Users.findOneAndUpdate({"email": email} , {$set: {"fortytwoID": profile._json.id}}, {new: true}).then(user => {
                        if (user) 
                            done(null, user)
                        else {
                            new Users({"firstname": firstname, "lastname": lastname, "username": firstname + tools.getRandomArbitrary(0, 1000), "email": email, "fortytwoID": profile._json.id, "profile_picture": profile_picture})
                            .save()
                            .then(user => done(null, user));
                        }
                    });
                }
            })
        }
    ));

  
}
  


  
  module.exports = router;