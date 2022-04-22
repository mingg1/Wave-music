export default {
  Query: {
    artist: async (_, { id }, { dataSources, req }) => {
      const { authorization } = req.headers;
      const artist = await dataSources.spotifyAPI.getArtist(authorization, id);
      return artist;
    },
    related_artists: async (_, { id }, { dataSources, req }) => {
      const { authorization } = req.headers;
      const { artists: relatedArtists } =
        await dataSources.spotifyAPI.getSimilarArtists(authorization, id);
      return relatedArtists;
    },
    featured_playlists: async (_, __, { dataSources, req }) => {
      const { token } = req.headers;
      console.log(req.headers);
      return await dataSources.spotifyAPI.getFeaturedPlayList(token);
    },
  },
};
