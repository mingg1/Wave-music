import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/auth-context';
import styled from 'styled-components';

const TopBar = styled.div`
  height: 75px;
  width: 100%;
  background-color: black;
  display: grid;
  position: fixed;
  margin-top: 0;
  margin-bottom: 50px;
  grid-template-columns: 1fr 0.5fr 0.5fr 3fr;
  justify-items: center;
  align-items: center;
  z-index: 1;
  align-content: center;
`;

const TopHeader = () => {
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const linkStyle = {
    margin: '0 50px',
    textDecoration: 'none',
    fontSize: '16px',
    color: 'white',
    fontWeight: 600,
  };

  return (
    <TopBar>
      <NavLink to="/" style={{ ...linkStyle }}>
        Wave
      </NavLink>
      <NavLink to="/post" style={{ ...linkStyle, width: ' max-content ' }}>
        DJ Station
      </NavLink>
      {/* <NavLink to="/curation" style={{ ...linkStyle }}>
        Curation
      </NavLink> */}
      <NavLink to="/browse" style={{ ...linkStyle }}>
        Browse
      </NavLink>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          justifySelf: 'end',
        }}
      >
        {isLoggedIn ? (
          <>
            <NavLink to={`/user/${loggedInUser.id}`} style={{ ...linkStyle }}>
              🥁 {loggedInUser.nickname}
            </NavLink>
            <NavLink style={{ ...linkStyle }} to="/" onClick={onLogout}>
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink style={{ ...linkStyle }} to="/login">
              Log In
            </NavLink>
            <NavLink style={{ ...linkStyle }} to="/signup">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
      <div />
    </TopBar>
  );
};

export default TopHeader;
