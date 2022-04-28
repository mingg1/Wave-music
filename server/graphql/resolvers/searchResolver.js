import User from '../../models/User';

export default {
  Query: {
    search: async (_, { query, type }, { dataSources, req }) => {
      const { sf_token } = req.headers;
      const getUsers = async () => {
        const users = await User.find({
          nickname: { $regex: query, $options: 'i' },
        });
        return { users };
      };
      if (type === 'user') {
        return getUsers();
      } else if (type === 'all') {
        const { users } = await getUsers();

        type = 'album,artist,track';
        const sfData = await dataSources.spotifyAPI.search(
          sf_token,
          query,
          type
        );

        return { ...sfData, users };
      } else {
        return await dataSources.spotifyAPI.search(sf_token, query, type);
      }

      // return await dataSources.spotifyAPI.search(sf_token, query, type);
    },
  },
};
