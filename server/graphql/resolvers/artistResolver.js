export default {
  Query: {
    artist: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const artist = await dataSources.spotifyAPI.getArtist(sf_token, id);
      return artist;
    },
    relatedArtists: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const { artists: relatedArtists } =
        await dataSources.spotifyAPI.getSimilarArtists(sf_token, id);
      return relatedArtists;
    },
    artistTopTracks: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getArtistsTopTracks(
        sf_token,
        id
      );
      return data.tracks;
    },
    artistAlbums: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getArtistAlbums(sf_token, id);
      console.log(data);
      return data.items;
    },
  },
};
