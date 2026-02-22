import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import "./db/db.js";
import { checkAuth } from "./utils/auth.js";
import SpotifyAPI from "./graphql/datasources/spotifyAPI.js";
import TokenAPI from "./graphql/dataSources/tokenAPI.js";
import cors from "cors";

(async () => {
  const PORT = process.env.PORT || 4000;
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const app = express();

    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    app.use(cors(corsOptions));

    await server.start();

    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          // console.log("Request headers: ", req.headers);
          const authHeader = req.headers.authorization || "";
          const token = authHeader.startsWith("Bearer ")
            ? authHeader.replace("Bearer ", "")
            : null;
// console.log("Extracted token: ", token);
          const currentUser = req ? checkAuth(req) : null;

          return {
            currentUser,
            token,
            req,
            dataSources: {
              tokenAPI: new TokenAPI(),
              spotifyAPI: new SpotifyAPI(),
            },
          };
        },
      }),
    );

    app.use("/", (req, res) => {
      res.send("Wave server 🐬");
    });
    app.listen(PORT, () => {
      console.log(
        "Running a GraphQL API server at http://localhost:4000/graphql",
      );
    });
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
