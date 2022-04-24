'use strict';
import jwt from 'jsonwebtoken';
import passport from './pass';

const checkAuth = (req, res) => {
  return new Promise((resolve) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req);
  });
};

const login = (req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log('info', err, user, info);
        reject(info);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          reject(err);
        }
        const token = jwt.sign(req.user, 'secret:D');
        resolve({ ...user, token, id: user._id });
      });
    })(req);
  });
};

const logout = (req, res) => {
  req.logout();
  res.json({ message: 'You have logged out.' });
};

export { login, logout, checkAuth };
