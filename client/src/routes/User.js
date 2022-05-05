import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import { Typography } from '@mui/material';

import TrackCard from '../components/TrackCard';
import LoadingIcon from '../components/LoadingIcon';
import GridContainer from '../components/GridContainer';
import ImageCard from '../components/ImageCard';
import { GET_USER_INFO } from '../queries/userInfoQuery';
import { MainTitle, SubTitle, ToggleTitle } from '../components/Typographies';
import { toggleCategories } from './Curation';

const User = () => {
  const { id } = useParams();
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error } = useQuery(GET_USER_INFO, {
    variables: { userId: id },
  });
  const [albumListShown, setAlbumListShown] = useState(true);
  const [artistListShown, setArtistListShown] = useState(true);
  const [trackListShown, setTrackListShown] = useState(true);
  const [playlistShown, setPlaylistShown] = useState(true);

  useEffect(() => {
    if (!loading && error) {
      fetchToken();
    }
  }, [error, userFavorites]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <>
          <div>
            <MainTitle>🎧 Welcome, {data.user.nickname}</MainTitle>
          </div>
          <ToggleTitle
            onClick={() => toggleCategories(setPlaylistShown)}
            shown={playlistShown}
          >
            Playlists
          </ToggleTitle>
          {data.userPlaylists && (
            <GridContainer visible={playlistShown}>
              {data.userPlaylists?.map((pl) => {
                return (
                  <ImageCard
                    element={pl}
                    key={pl.id}
                    type="playlist"
                    userMade={pl.userMade}
                  />
                );
              })}
            </GridContainer>
          )}

          <SubTitle style={{ color: '#1976d2' }}>Favorites</SubTitle>
          <ToggleTitle
            onClick={() => toggleCategories(setTrackListShown)}
            shown={trackListShown}
          >
            Tracks
          </ToggleTitle>

          <div style={{ width: '80vw' }}>
            {data.user.favorites.tracks &&
              data.user.favorites.tracks?.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  favorites={userFavorites}
                />
              ))}
          </div>

          <ToggleTitle
            onClick={() => toggleCategories(setArtistListShown)}
            shown={artistListShown}
          >
            Artists
          </ToggleTitle>
          {data.user.favorites.artists && (
            <GridContainer visible={artistListShown}>
              {data.user.favorites.artists?.map((artist) => {
                return (
                  <ImageCard
                    element={artist}
                    key={artist.id}
                    type={artist.type}
                  />
                );
              })}
            </GridContainer>
          )}
          <ToggleTitle
            onClick={() => toggleCategories(setAlbumListShown)}
            shown={albumListShown}
          >
            Albums
          </ToggleTitle>
          {data.user.favorites?.albums && (
            <GridContainer visible={albumListShown}>
              {data.user.favorites?.albums?.map((album) => {
                console.log(album);
                return (
                  <ImageCard element={album} key={album?.id} type="album" />
                );
              })}
            </GridContainer>
          )}
        </>
      )}
    </>
  );
};

export default User;
