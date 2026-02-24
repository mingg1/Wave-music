import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import TokenContext from "../contexts/token-context";
import TrackCard from "../components/TrackCard";
import LoadingIcon from "../components/LoadingIcon";
import GridContainer from "../components/GridContainer";
import ImageCard from "../components/ImageCard";
import { GET_USER_INFO } from "../queries/userInfoQuery";
import { MainTitle, SubTitle, ToggleTitle } from "../components/Typographies";
import { toggleCategories } from "./Curation";

const User = () => {
  const { id } = useParams();
  const { userFavorites, sfToken } = useContext(TokenContext);
  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: { userId: id },
    skip: !sfToken,
  });
  const [albumListShown, setAlbumListShown] = useState(true);
  const [artistListShown, setArtistListShown] = useState(true);
  const [trackListShown, setTrackListShown] = useState(true);
  const [playlistShown, setPlaylistShown] = useState(true);

  return (
    <>
      {loading && !sfToken ? (
        <LoadingIcon />
      ) : sfToken && data ? (
        <>
          <div>
            <MainTitle>🎧 Welcome, {data?.user?.nickname}</MainTitle>
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

          <SubTitle style={{ color: "#1976d2" }}>Favorites</SubTitle>
          <ToggleTitle
            onClick={() => toggleCategories(setTrackListShown)}
            shown={trackListShown}
          >
            Tracks
          </ToggleTitle>

          <div style={{ width: "80vw" }}>
            {data.user?.favorites?.tracks &&
              data.user?.favorites?.tracks?.map((track) => (
                <TrackCard
                  key={track?.id}
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
                    key={artist?.id}
                    type={artist?.type}
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
                return (
                  <ImageCard element={album} key={album?.id} type="album" />
                );
              })}
            </GridContainer>
          )}
        </>
      ) : (
        <div style={{ marginTop: 100 }}>
          <LoadingIcon />
        </div>
      )}
    </>
  );
};

export default User;
