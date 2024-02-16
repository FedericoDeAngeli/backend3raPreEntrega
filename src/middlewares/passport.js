import passport from 'passport'
import { Strategy } from 'passport-local'
import { UserManager } from '../models/userModel.js'



passport.use('register', new Strategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await UserManager.registrar(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

passport.use('login', new Strategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const datosUsuario = await UserManager.autenticar(email, password)
    console.log(datosUsuario)
    done(null, datosUsuario)
  } catch (error) {
    return done(null, false, error.message)
  }
}))


// export default initializePassport

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function autenticacion(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}