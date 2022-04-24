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
  },
};
