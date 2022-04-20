import { createServer } from '@graphql-yoga/node';
import express from 'express';
import resolvers from './graphql/resolver.js';
import schema from './graphql/schema.js';

const server = createServer({ schema });
const app = express();

app.use('/graphql', server);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
