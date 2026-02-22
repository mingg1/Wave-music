import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
  ServerError,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";

const errorLink = new ErrorLink(async ({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL ERROR: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      );
    });
  } else if (ServerError.is(error))
    console.error("SERVER ERROR: ", error.message);
  else if (error)
    console.error("NETWORK ERROR: ", error);
});

const authLink = new SetContextLink(async (_, { headers }) => {
  const raw = localStorage.getItem("sf-token");
  const parsed = raw ? JSON.parse(raw) : null;
  const token = parsed?.sf_token;

  return {
    headers: {
      ...headers,
      sf_token: token ? token : "",
    },
  };
});

const SERVER_URL = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const appLink = ApolloLink.from([errorLink, SERVER_URL]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(appLink),
});

export default client;
