'use strict';

export default {
  Query: {
    sf_token: async (_, __, { dataSources }) => {
      const { access_token } = await dataSources.tokenAPI.getToken();
      return access_token
    },
  },
};
