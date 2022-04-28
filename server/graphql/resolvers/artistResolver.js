export default {
  Favorite: {
    artists: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const ids = parent.artists?.filter((t) => t).toString() || args.ids;
      console.log(ids);
      return await dataSources.spotifyAPI.getArtists(sf_token, ids);
    },
  },
  Query: {
    artist: async (_, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const artist = await dataSources.spotifyAPI.getArtists(sf_token, ids);

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
  Track: {
    artists: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const ids = parent.artists?.map((artist) => artist.id)?.toString();
      const artist = await dataSources.spotifyAPI.getArtists(sf_token, ids);
      return artist;
    },
  },
};
