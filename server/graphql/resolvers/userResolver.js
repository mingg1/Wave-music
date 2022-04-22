'use strict';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { login } from '../../utils/auth';

export default {
  Query: {
    user: async (parent, args) => {
      // find user by id
      return await User.findById(args.id);
    },
    login: async (parent, args, { req }) => {
      // call passport login (done in class)
      req.body = args;
      return { value: await login(req) };
    },
    song: async (_, __, { dataSources }) => {
      const { access_token } = await dataSources.tokenAPI.getToken();
      return { token: access_token };
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateUser: async (parent, args, context) => {
      try {
        const user = await context.currentUser;
        if (!user) {
          throw new AuthenticationError('Not authorized');
        }
        let userInfo = { ...args };
        if (args.password) {
          const hash = await bcrypt.hash(args.password, 12);
          userInfo = { ...args, password: hash };
        }
        return await User.findByIdAndUpdate(
          user._id,
          { ...userInfo },
          { new: true }
        );
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
