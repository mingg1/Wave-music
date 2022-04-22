import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolver.js';
import artistResolver from './resolvers/artistResolver.js';
import userResolver from './resolvers/userResolver.js';
import userSchema from './schemas/userSchema.js';

const typeDef = /* GraphQL */ ``;

export default [resolvers, userResolver, artistResolver];
