import 'regenerator-runtime';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './graphql/schemas/index';
import resolvers from './graphql/resolvers/index';
import './db/db';
import { checkAuth } from './utils/auth';
import SpotifyAPI from './graphql/datasources/spotifyAPI';
import TokenAPI from './graphql/dataSources/tokenAPI';
import cors from 'cors';

(async () => {
  const PORT = process.env.PORT || 4000;
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
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
      async onHealthCheck() {
        if (everythingLooksHealthy()) {
          return;
        } else {
          throw new Error('...');
        }
      },
    });
    const app = express();

    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    app.use(cors(corsOptions));

    await server.start();
    server.applyMiddleware({ app, cors: false });

    app.use('/', (req, res) => {
      res.send('Wave server 🐬');
    });
    app.listen(PORT, () => {
      console.log(
        'Running a GraphQL API server at http://localhost:4000/graphql'
      );
    });
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();
