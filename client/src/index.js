import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { TokenContextProvider } from './contexts/token-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);
