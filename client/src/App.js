import './App.css';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useState, createContext, useEffect } from 'react';

const GET_SF_TOKEN = gql`
  query Song {
    song {
      token
    }
  }
`;

const GET_PL = gql`
  {
    featured_playlists {
      album_type
      id
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_PL);
  console.log(data);
  const UserContext = createContext();
  const [sfToken, setSfToken] = useState(
    sessionStorage.getItem('sf-token') || null
  );
  const [getToken] = useLazyQuery(GET_SF_TOKEN);

  // const isTokenValid = (token) => {
  //   const tokenData = JSON.parse(sfToken);
  //   let remainTime = tokenData.tokenTimeout || Date.now() - 3600000; // an hour ago from current time
  //   let currentTime = new Date();
  //   let tokenTime = new Date(remainTime);
  //   return tokenTime > currentTime;
  // };

  const fetchToken = async () => {
    // if (sfToken === null || sfToken.token === null || !isTokenValid()) {
    const {
      data: {
        song: { token },
      },
    } = await getToken();

    //  const tokenTimeout = Date.now() + 3599900;
    // const data = JSON.stringify({ token, tokenTimeout });
    sessionStorage.setItem('sf-token', token);
    setSfToken(token);
    // } else {
    //   console.log('no need to');
    // }
  };

  useEffect(() => {
    // validation
    if (error) {
      fetchToken();
      refetch();
      console.log(error);
    }

    // update or not
  }, [error, sfToken]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
