import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error('GQL ERROR: ', graphQLErrors);
  }
  if (networkError) {
    console.error('NETWORK ERROR: ', networkError);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const { sf_token } = JSON.parse(localStorage.getItem('sf-token')) || {};
  return {
    headers: {
      ...headers,
      sf_token,
    },
  };
});
const SERVER_URL = new HttpLink({
  uri: 'https://wave-music-server.azurewebsites.net/graphql',
});
const appLink = from([errorLink, SERVER_URL]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(appLink),
});

export default client;
