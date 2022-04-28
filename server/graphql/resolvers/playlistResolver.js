import Playlist from '../../models/Playlist';

export default {
  Query: {
    featuredPaylists: async (_, __, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getFeaturedPlayList(sf_token);
    },
    playlistTracks: async (_, { playlistId }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getPlayListItems(
        sf_token,
        playlistId
      );
      return data;
    },
    userPlaylists: async (_, { userId }) => {
      try {
        return await Playlist.find({ owner: userId });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addPlayLists: async (_, { name, userId }) => {
      try {
        const newPlaylist = new Playlist({ name, owner: userId });
        const result = await newPlaylist.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    addTrackToPlaylist: async (_, { playlistId, trackId }) => {
      try {
        const playlist = await Playlist.findById(playlistId);
        playlist.tracks.push(trackId);
        const result = await playlist.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
