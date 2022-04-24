export default {
  Query: {
    featured_playlists: async (_, __, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getFeaturedPlayList(sf_token);
    },
    playlist_tracks: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getPlayListItems(sf_token, id);
      console.log(data[0].track);
      return data;
    },
  },
};
