const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
        done(err, false)
      }
    }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((_id, done) => {
    User.findOne({ id: _id })
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}