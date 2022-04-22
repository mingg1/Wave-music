'use strict';
import passport from 'passport';
import Strategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import bcrypt from 'bcrypt';

passport.use(
  new Strategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, 'incorrect username');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const strippedUser = user.toObject();
      delete strippedUser.password;
      return done(null, strippedUser);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret:D',
    },
    (payload, done) => {
      done(null, payload);
    }
  )
);

export default passport;
