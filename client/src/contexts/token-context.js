import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useState, useEffect, createContext } from 'react';

const TokenContext = createContext();

const GET_SF_TOKEN = gql`
  {
    sf_token
  }
`;

const GET_USER_FAVORITES = gql`
  query Query($userId: ID) {
    userFavorites(id: $userId) {
      tracks {
        id
        name
      }
      albums {
        id
      }
      artists {
        id
      }
    }
  }
`;

export const TokenContextProvider = (props) => {
  // const [isTokenValid, setIsTokenValid] = useState(false)
  const [userFavorites, setUserFavorites] = useState(undefined);
  const [refetchFavorites, setRefetchFavorites] = useState(() => {});
  const [sfToken, setSfToken] = useState(
    localStorage.getItem('sf-token') || null
  );
  const [getUserFavorites] = useLazyQuery(GET_USER_FAVORITES);
  const [getToken] = useLazyQuery(GET_SF_TOKEN);

  const isTokenValid = () => {
    const tokenData = JSON.parse(sfToken);
    let remainTime = tokenData.tokenTimeout || Date.now() - 3600000; // an hour ago from current time
    let currentTime = new Date();
    let tokenTime = new Date(remainTime);
    return tokenTime > currentTime;
  };

  const fetchToken = async () => {
    const {
      data: { sf_token: token },
    } = await getToken();

    const tokenTimeout = Date.now() + 3599900;
    const data = JSON.stringify({ sf_token: token, tokenTimeout });
    localStorage.setItem('sf-token', data);
    setSfToken(data);
  };

  const getFavorites = async (userId) => {
    const {
      data: { userFavorites },
      refetch,
    } = await getUserFavorites({
      variables: {
        userId: JSON.parse(localStorage.getItem('user'))?.id || userId,
      },
    });
    console.log(userFavorites);
    if (userFavorites !== null && userFavorites[0] !== null) {
      setRefetchFavorites(refetch);
      setUserFavorites(userFavorites);
    }
  };

  useEffect(() => {
    // validation
    if (sfToken === null || sfToken.token === null || !isTokenValid()) {
      fetchToken();
    }
    getFavorites();
    // if (!loading || error) {
    //   fetchToken();
    // }
    // update or not
  }, [userFavorites]);

  return (
    <TokenContext.Provider
      value={{
        sfToken,
        fetchToken,
        userFavorites,
        refetchFavorites,
        setUserFavorites,
        getFavorites,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
