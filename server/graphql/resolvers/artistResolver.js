export default {
  Query: {
    artist: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const artist = await dataSources.spotifyAPI.getArtist(sf_token, id);
      return artist;
    },
    related_artists: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const { artists: relatedArtists } =
        await dataSources.spotifyAPI.getSimilarArtists(sf_token, id);
      return relatedArtists;
    },
    artist_top_tracks: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getArtistsTopTracks(
        sf_token,
        id
      );
      return data.tracks;
    },
    artist_albums: async (_, { id }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const data = await dataSources.spotifyAPI.getArtistAlbums(sf_token, id);
      console.log(data);
      return data.items;
    },
  },
};
