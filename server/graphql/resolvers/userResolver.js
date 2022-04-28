'use strict';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import Favorite from '../../models/Favorite';
import Track from '../../models/Track';
import { login } from '../../utils/auth';

export default {
  Comment: {
    owner: async (parent) => {
      return await User.findById(parent.owner).populate({
        path: 'favorites',
        populate: [{ path: 'owner', model: User }],
      });
    },
  },
  UserPlaylist: {
    owner: async (parent) => {
      return await User.findById(parent.owner).populate({
        path: 'favorites',
        populate: [{ path: 'owner', model: User }],
      });
    },
  },
  Query: {
    user: async (parent, { id }) => {
      // find user by id
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
    userByNickname: async (_, { nickname }) => {
      return await User.findOne({ nickname }).populate({
        path: 'favorites',
        populate: [{ path: 'owner', model: User }],
      });
    },
    // userPlaylists: async (_, { id }) => {
    //   //return await User.
    // },
  },
  Mutation: {
    addFavorite: async (_, { id, type, userId }, { req }) => {
      const userFavorites = await Favorite.findOne({ owner: userId });
      switch (type) {
        case 'track':
          let tracks = userFavorites.tracks;
          if (tracks.includes(id)) {
            userFavorites.tracks = tracks.filter((trackId) => trackId !== id);
          } else {
            userFavorites.tracks.push(id);
          }
          break;
        case 'album':
          let albums = userFavorites.albums;
          if (albums.includes(id)) {
            userFavorites.albums = albums.filter((albumId) => albumId !== id);
          } else userFavorites.albums.push(id);
          break;
        case 'artist':
          let artists = userFavorites.artists;
          if (artists.includes(id)) {
            userFavorites.artists = artists.filter(
              (artistId) => artistId !== id
            );
          } else userFavorites.artists.push(id);
          break;
        default:
          break;
      }
      await userFavorites.save();

      return await userFavorites;
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
