import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import PlayListDetail from '../routes/PlayListDetail';

import Login from '../routes/Login';
import { AuthContextProvider } from '../contexts/auth-context';
import TopHeader from './MainHeader/TopHeader';
import styled from 'styled-components';
import SignUp from '../routes/Signup';
import ArtistDetail from '../routes/ArtistDetail';
import AlbumDetail from '../routes/AlbumDetail';
import TrackDetail from '../routes/TrackDetail';
import background from './images/background.jpeg';
import Search from '../routes/Search';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: absolute;
  top: 75px;
  min-height: calc(100% - 75px);
  background-image: url(${background});
  background-size: cover;
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
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/track/:id" element={<TrackDetail />} />
            <Route exact path="/artist/:id" element={<ArtistDetail />} />
            <Route exact path="/album/:id" element={<AlbumDetail />} />
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
