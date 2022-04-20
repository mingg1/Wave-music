import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolver.js';

const typeDef = /* GraphQL */ `
  type Track {
    name: String!
    url: String
  }

  type Query {
    tracks: [Track]
  }
`;

const schema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: [typeDef],
});
export default schema;
