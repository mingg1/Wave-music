import { getTopTracks } from './db.js';

const resolvers = {
  Query: {
    tracks: (_) => getTopTracks(),
  },
};
export default resolvers;
