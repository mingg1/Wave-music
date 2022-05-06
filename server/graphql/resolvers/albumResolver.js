export default {
  Favorite: {
    albums: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const ids =
        parent.albums?.filter((album) => album).toString() || args.ids;

      return await dataSources.spotifyAPI.getAlbums(sf_token, ids);
    },
  },
  Query: {
    albums: async (_, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getAlbums(sf_token, ids);
    },
    newReleases: async (_, __, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getNewAlbums(sf_token);
    },
    albumTracks: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getAlbumTracks(sf_token, id);
    },
  },
};
