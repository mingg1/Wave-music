import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './graphql/schemas/index';
import resolvers from './graphql/schema';
import './db/db';
import { checkAuth } from './utils/auth';
import SpotifyAPI from './graphql/datasources/spotifyAPI';
import { TokenAPI } from './graphql/dataSources/tokenAPI';

(async () => {
  try {
    const server = new ApolloServer({
      cors: true,
      resolvers,
      typeDefs,
      dataSources: () => {
        return {
          tokenAPI: new TokenAPI(),
          spotifyAPI: new SpotifyAPI(),
        };
      },
      context: async ({ req }) => {
        if (req) {
          const currentUser = checkAuth(req);
          return { currentUser, req };
        }
      },
    });
    const app = express();

    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log(
        'Running a GraphQL API server at http://localhost:4000/graphql'
      );
    });
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();
