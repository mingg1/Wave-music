import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  onLogout: () => {},
  onLogin: (res) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user-token') || false
  );

  const logoutHandler = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const loginHandler = (res) => {
    const { token, ...user } = res;
    localStorage.setItem('user-token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
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
