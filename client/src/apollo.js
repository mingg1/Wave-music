import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }

  if (networkError) {
    // handle network error
    console.log(networkError);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = sessionStorage.getItem('sf-token');
  return {
    headers: {
      ...headers,

      token,
    },
  };
});
const SERVER_URL = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const appLink = from([errorLink, SERVER_URL]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(appLink),
});

export default client;
