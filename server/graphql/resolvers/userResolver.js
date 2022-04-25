'use strict';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import Favorite from '../../models/Favorite';
import Track from '../../models/Track';
import { login } from '../../utils/auth';

export default {
  Query: {
    user: async (parent, { id }) => {
      // find user by id
      console.log(await Favorite.findOne({ owner: id }).populate('owner'));
      return await User.findById(id).populate({
        path: 'favorites',
        populate: [{ path: 'owner', model: User }],
      });
    },
    login: async (parent, args, { req }) => {
      // call passport login (done in class)
      req.body = args;
      return await login(req);
    },
    userFavorites: async (parent, { id }, { req }) => {
      console.log(await Favorite.findOne({ owner: id }).populate('owner'));
      return await Favorite.findOne({ owner: id }).populate('owner');
    },
    // userPlaylists: async (_, { id }) => {
    //   //return await User.
    // },
  },
  Mutation: {
    addFavorite: async (_, { id, type, userId }, { req }) => {
      const userFavorites = await Favorite.findOne({ owner: userId });
      console.log('wtf', userFavorites.tracks, id);
      switch (type) {
        case 'track':
          if (userFavorites.tracks.includes(id)) {
            console.log('his');
            userFavorites.tracks = userFavorites.tracks.filter(
              (trackId) => trackId !== id
            );
          } else {
            console.log('hers');
            userFavorites.tracks.push(id);
          }
          // const track = await Track.create({ refId: id });
          // console.log(track, ' : track');
          // userFavorites.tracks.includes(id)
          //   ? userFavorites.tracks.filter((trackId) => trackId !== id)
          //   : userFavorites.tracks.push(id);
          console.log(userFavorites.tracks);
          await userFavorites.save();

          break;

        default:
          break;
      }
      return await userFavorites.populate('tracks');
    },
    registerUser: async (parent, args) => {
      try {
        // const hash = await bcrypt.hash(args.password, 12);
        // const userWithHash = {
        //   ...args,
        //   password: hash,
        // };
        const newUser = new User({ ...args });
        const userFavorites = await Favorite.create({ owner: newUser.id });
        newUser.favorites = userFavorites;
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
