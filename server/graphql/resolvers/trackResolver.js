export default {
  Favorite: {
    tracks: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;

      const ids = parent.tracks?.filter((t) => t).toString() || args.ids;

      return await dataSources.spotifyAPI.getTracks(sf_token, ids);
    },
  },
  Query: {
    tracks: async (parent, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;

      // const ids = parent.tracks?.toString() || args.ids;
      return await dataSources.spotifyAPI.getTracks(sf_token, ids);
    },
    recommendations: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getRecommendations(sf_token, id);
    },
  },
};
