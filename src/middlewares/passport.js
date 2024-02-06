import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { authService, userService } from "../services/userServices.js";

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  },
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await authService.registerUser(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: "email"
  }, async (email, password, done) => {
    try {
      const datosUsuario = await authService.authenticateUser(email, password)
      return done(null, datosUsuario)
    } catch (error) {
       return done(null, false, error.message)
    }
  }))

// passport.serializeUser((user, next)=>{next(null, user)});
// passport.deserializeUser((user, next)=>{next(null, user)});

passport.serializeUser((user, done) => {
  done(null, user._id); // Utiliza un identificador único, como el _id de MongoDB
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await userService.getUser(id);
      done(null, user);
  } catch (error) {
      done(error, null);
  }})

const passportInitialize = passport.initialize()
const passportSession = passport.session();

export function autenticacion(req, res, next) {
    passportInitialize(req, res, ()=> {
        passportSession(req, res, next);
    })
}