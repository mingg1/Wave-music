export default {
  Query: {
    tracks: async (_, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getTracks(sf_token, ids);
    },
    recommendations: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getRecommendations(sf_token, id);
    },
  },
};
