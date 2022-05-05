export default {
  /* Since API is able to take only 20 parameter ids at once, 
   if there are more than 20 tracks in favorite or playlist, 
   the list will be splitted and query will be sent as many times as generated arrays */
  UserPlaylist: {
    tracks: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const PlTracks = parent.tracks;
      if (PlTracks.length > 20) {
        const trackDataList = new Array();
        const arrayAmount = Math.ceil(PlTracks.length / 20);
        for (let i = 0; i < arrayAmount; i++) {
          const splitedTracks = PlTracks.splice(-20).toString();
          trackDataList.push(
            await dataSources.spotifyAPI.getTracks(sf_token, splitedTracks)
          );
        }
        return trackDataList.flat();
      } else {
        const ids = parent.tracks?.filter((t) => t).toString() || args.ids;
        return await dataSources.spotifyAPI.getTracks(sf_token, ids);
      }
    },
  },
  Favorite: {
    tracks: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const favTracks = parent.tracks;
      if (favTracks.length > 20) {
        const trackDataList = new Array();
        const arrayAmount = Math.ceil(favTracks.length / 20);

        for (let i = 0; i < arrayAmount; i++) {
          const splitedTracks = favTracks.splice(-20).toString();
          trackDataList.push(
            await dataSources.spotifyAPI.getTracks(sf_token, splitedTracks)
          );
        }
        return trackDataList.flat();
      } else {
        const ids = parent.tracks?.filter((t) => t).toString() || args.ids;
        return await dataSources.spotifyAPI.getTracks(sf_token, ids);
      }
    },
  },
  Query: {
    genres: async (_, __, { dataSources, req }) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getSeedGenres(sf_token);
    },
    tracks: async (parent, { ids }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      // const ids = parent.tracks?.toString() || args.ids;
      return await dataSources.spotifyAPI.getTracks(sf_token, ids);
    },
    recommendations: async (
      _,
      { seedArtists, seedGenres, seedTracks },
      { dataSources, req }
    ) => {
      const { sf_token } = req.headers;
      return await dataSources.spotifyAPI.getRecommendations(
        sf_token,
        seedArtists,
        seedGenres,
        seedTracks
      );
    },
  },
};
