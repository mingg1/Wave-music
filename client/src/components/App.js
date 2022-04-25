import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import Home from '../routes/Home';
import PlayListDetail from '../routes/PlayListDetail';

import Login from '../routes/Login';
import AuthContext, { AuthContextProvider } from '../contexts/auth-context';
import TopHeader from './MainHeader/TopHeader';
import styled from 'styled-components';
import SignUp from '../routes/Signup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: orange;
  position: absolute;
  top: 75px;
  min-height: 100vh;
  max-height: calc(100vh - 75px);
`;

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <TopHeader />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/track/:id" element={<Login />} />
            <Route exact path="/artist/:id" element={<Login />} />
            <Route exact path="/album/:id" element={<Login />} />
            <Route exact path="/playlist" element={<PlayListDetail />} />
            <Route exact path="/playlist/:id" element={<PlayListDetail />} />
            <Route exact path="/user/:id" element={<PlayListDetail />} />
          </Routes>
        </Container>
      </AuthContextProvider>
    </>
  );
};

export default App;
