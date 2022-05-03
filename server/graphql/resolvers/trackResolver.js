export default {
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
