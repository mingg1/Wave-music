export default {
  Query: {
    albums: async (_, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const { albums } = await dataSources.spotifyAPI.getAlbums(sf_token, ids);
      return albums;
    },
    newReleases: async (_, __, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getNewAlbums(sf_token);
    },
    albumTracks: async (_, {id}, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getAlbumTracks(sf_token, id);
    },
  },
};
