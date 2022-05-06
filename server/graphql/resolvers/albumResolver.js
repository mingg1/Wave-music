export default {
  Favorite: {
    albums: async (parent, args, { dataSources, req }) => {
      const { sf_token } = req.headers;
      // const ids =
      //   parent.albums?.filter((album) => album).toString() || args.ids;

      const albumList = parent.albums;
      console.log(albumList);
      if (albumList.length > 20) {
        const albums = new Array();
        const arrayAmount = Math.ceil(albumList.length / 20);
        for (let i = 0; i < arrayAmount; i++) {
          const splitedArtists = albumList.splice(-20).toString();
          albums.push(
            await dataSources.spotifyAPI.getAlbums(sf_token, splitedArtists)
          );
        }
        return albums.flat();
      } else {
        const ids = parent.artists?.filter((t) => t).toString() || args.ids;
        console.log(ids);
        return await dataSources.spotifyAPI.getAlbums(sf_token, ids);
      }
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
