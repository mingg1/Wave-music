import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../contexts/auth-context';
import Home from '../routes/Home';
import PlayListDetail from '../routes/PlayListDetail';
import Login from '../routes/Login';
import TopHeader from './MainHeader/TopHeader';
import styled from 'styled-components';
import SignUp from '../routes/Signup';
import ArtistDetail from '../routes/ArtistDetail';
import AlbumDetail from '../routes/AlbumDetail';
import TrackDetail from '../routes/TrackDetail';
import background from './images/background.jpeg';
import Search from '../routes/Search';
import User from '../routes/User';
import Player from './Player';
import Post from '../routes/Post';
import WritePost from '../routes/WritePost';
import SinglePost from '../routes/SinglePost';
import Curation from '../routes/Curation';
import CurationResult from '../routes/CurationResult';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: absolute;
  top: 75px;
  padding-bottom: 120px;
  min-height: calc(100vh - 150px);
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
            <Route exact path="/post" element={<Post />} />
            <Route exact path="/post/wirte" element={<WritePost />} />
            <Route exact path="/post/:id" element={<SinglePost />} />
            <Route exact path="/track/:id" element={<TrackDetail />} />
            <Route exact path="/artist/:id" element={<ArtistDetail />} />
            <Route exact path="/album/:id" element={<AlbumDetail />} />
            <Route exact path="/playlist" element={<PlayListDetail />} />
            <Route exact path="/playlist/:id" element={<PlayListDetail />} />
            <Route exact path="/user/:id" element={<User />} />
            <Route exact path="/curation" element={<Curation />} />
            <Route
              exact
              path="/curation/results"
              element={<CurationResult />}
            />
          </Routes>
        </Container>
        <Player />
      </AuthContextProvider>
    </>
  );
};

export default App;
