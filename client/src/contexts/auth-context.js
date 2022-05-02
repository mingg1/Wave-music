import React, { useState, useEffect, useContext } from 'react';
import TokenContext from '../contexts/token-context';

const AuthContext = React.createContext({
  onLogout: () => {},
  onLogin: (res) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user-token') || false
  );
  const { getFavorites, userFavorites, setUserFavorites, setUserPlaylists } =
    useContext(TokenContext);

  const logoutHandler = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserFavorites(undefined);
    setUserPlaylists(undefined);
  };

  const loginHandler = async (res) => {
    const { token, ...user } = res;
    localStorage.setItem('user-token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    // await getFavorites(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
