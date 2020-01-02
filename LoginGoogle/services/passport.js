const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const Keys = require("../config/keys");

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googlelientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Esta linea de codigo comprueba si ya un usuario con el parametro que le pasemos y 
      //como es una promesa le pasamo la funcion de comprobar si existe o no
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          //Si el usuario existe 
          if (existingUser) {
            done(null, existingUser);
          }
          //Si el usuario no existe 
          else {
            //como es una promesa le tenemos que pasar al usuario en una funcion
            new User({ googleId: profile.id }).save()
              .then(user => done(null, user))
          }
        })
    }
  )
);