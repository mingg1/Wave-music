import { gql } from "@apollo/client";
import React, { useState, useEffect, createContext, useRef } from "react";
import { useLazyQuery } from "@apollo/client/react";

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
  const [tokenReady, setTokenReady] = useState(false);
  const [userFavorites, setUserFavorites] = useState(undefined);
  const [userPlaylists, setUserPlaylists] = useState([]);
  // const [refetchFavorites, setRefetchFavorites] = useState(() => {});
  const refetchFavoritesRef = useRef(null);
  const [sfToken, setSfToken] = useState(localStorage.getItem("sf-token"));
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("user"),
  );

  const [getUserFavorites] = useLazyQuery(GET_USER_FAVORITES);
  const [getToken] = useLazyQuery(GET_SF_TOKEN);

  const isTokenValid = () => {
    const tokenData = sfToken ? JSON.parse(sfToken) : null;
    if (!tokenData || !tokenData.tokenTimeout) return false;
    return tokenData.tokenTimeout > Date.now();
  };

  const fetchToken = async () => {
    try {
      const { data } = await getToken();
      if (!data?.sf_token) return;
      const token = data.sf_token;
      const tokenTimeout = Date.now() + 3599900;
      const tokenInfo = JSON.stringify({ sf_token: token, tokenTimeout });
      localStorage.setItem("sf-token", tokenInfo);
      setSfToken(tokenInfo);
      return token;
    } catch (error) {
      if (error.name === "AbortError") return null;
      console.error("Error fetching token: ", error);
      return null;
    }
  };

  const getFavorites = async (userId, token) => {
    try {
      const {
        data: { userFavorites },
        error,
        refetch,
      } = await getUserFavorites({
        context: {
          headers: {
            sf_token: token,
          },
        },
        variables: {
          userId,
        },
      });
      if (error) {
        console.error("Error fetching favorites: ", error);
        return;
      }
      console.log("favorites: ", userFavorites);
      refetchFavoritesRef.current = refetch;
      if (userFavorites !== null && userFavorites[0] !== null) {
        // setUserFavorites(userFavorites);
        setUserFavorites(userFavorites);
      }
    } catch (error) {
      if (error.name === "AbortError") return null;
      console.error("Error fetching favorites: ", error);
    }
  };

  const refetchFavorites = async () => {
    if (refetchFavoritesRef.current) {
      const { data } = await refetchFavoritesRef.current();
      if (data?.userFavorites) {
        setUserFavorites(data.userFavorites);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // validation
        let token = null;
        if (!sfToken || !isTokenValid()) {
          token = await fetchToken();
        } else token = JSON.parse(sfToken).sf_token;
        if (loggedInUser && token) {
          await getFavorites(JSON.parse(loggedInUser).id, token);
        } 
        if (token)
          setTokenReady(true);
      } catch (error) {
        console.error("Error during token initialization: ", error);
      }
    };
    init();
  }, []);

  return (
    <TokenContext.Provider
      value={{
        sfToken,
        fetchToken,
        userFavorites,
        refetchFavorites,
        setUserFavorites,
        getFavorites,
        userPlaylists,
        setUserPlaylists,
        tokenReady,
        isTokenValid
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
