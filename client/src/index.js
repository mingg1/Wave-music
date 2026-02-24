import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo";
import { BrowserRouter as Router } from "react-router-dom";
import { TokenContextProvider } from "./contexts/token-context";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <TokenContextProvider>
            <App />
          </TokenContextProvider>
        </Provider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
);
