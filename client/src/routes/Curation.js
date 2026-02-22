import React, { useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../contexts/token-context';
import { Button } from '@mui/material';
import LoadingIcon from '../components/LoadingIcon';
import GridContainer from '../components/GridContainer';
import NoLinkCard from '../components/NoLinkCard';
import TrackItem from '../components/TrackItem';
import { ToggleTitle, MainTitle, SubTitle } from '../components/Typographies';
import GenreItem from '../components/GenreItem';

const CURATION = gql`
  query userFavLists($userId: ID!) {
    genres
    user(id: $userId) {
      nickname
      favorites {
        tracks {
          id
          duration_ms
          name
          preview_url
          album {
            name
            images {
              url
            }
          }
          artists {
            name
          }
          type
        }
        artists {
          name
          type
          images {
            url
          }
          id
        }
      }
    }
  }
`;

export const toggleCategories = (setVisibility) => {
  setVisibility((prev) => !prev);
};

const Curation = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({
    artist: [],
    genre: [],
    track: [],
  });
  const [artistListShown, setArtistListShown] = useState(true);
  const [genreListShown, setGenreListShown] = useState(true);
  const [trackListShown, setTrackListShown] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  const { fetchToken, userFavorites } = useContext(TokenContext);
  const { loading, data, error, refetch } = useQuery(CURATION, {
    variables: { userId },
  });

  const setOptions = (selectedItem, type) => {
    if (selectedItems[type].includes(selectedItem)) {
      setSelectedItems((prev) => ({
        ...prev,
        [type]: selectedItems[type].filter((item) => item !== selectedItem),
      }));
      setSelectedAmount(selectedAmount - 1);
    } else {
      if (selectedAmount < 5) {
        setSelectedItems((prev) => ({
          ...prev,
          [type]: prev[type].concat(selectedItem),
        }));
        setSelectedAmount(selectedAmount + 1);
      }
    }
  };

  useEffect(() => {
    if (!userId) navigate('/login');
    if (!loading && error) {
      fetchToken();
      refetch();
    }
  }, [error, userFavorites, selectedItems, loading]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <>
          <MainTitle>Suggestions for you, {data.user.nickname}</MainTitle>
          <SubTitle>
            🎯 Choose up to 5 options to get recommendations based on your
            favorites and genres
          </SubTitle>
          <ToggleTitle
            title={'Tracks'}
            onClick={() => toggleCategories(setTrackListShown)}
            shown={trackListShown}
          />
          <div
            style={{
              display: trackListShown ? 'grid' : 'none',
              gridTemplateColumns: 'repeat(2,1fr)',
              maxWidth: '70%',
              flexFlow: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {data.user?.favorites?.tracks?.map((track) => (
              <TrackItem
                track={track}
                selected={selectedAmount}
                clickEvt={setOptions}
              />
            ))}
          </div>

          <ToggleTitle
            title={'Artists'}
            onClick={() => toggleCategories(setArtistListShown)}
            shown={artistListShown}
          />
          <GridContainer visible={artistListShown}>
            {data.user?.favorites?.artists &&
              data.user?.favorites?.artists?.map((artist) => (
                <NoLinkCard
                  key={artist?.id}
                  element={artist}
                  selected={selectedAmount}
                  clickEvt={setOptions}
                />
              ))}
          </GridContainer>

          <ToggleTitle
            title={'Genres'}
            onClick={() => toggleCategories(setGenreListShown)}
            shown={genreListShown}
          />
          <>
            <ul
              style={{
                maxWidth: '70%',
                display: genreListShown ? 'flex' : 'none',
                gridGap: 16,
                margin: 'auto',
                flexFlow: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {data.genres?.map((genre) => (
                <GenreItem
                  selected={selectedAmount}
                  clickEvt={setOptions}
                  genre={genre}
                />
              ))}
            </ul>
          </>
          <Button
            variant="contained"
            style={{
              margin: '48px 0',
              padding: 24,
              borderRadius: 15,
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
            }}
            onClick={() => {
              navigate('results', { state: { ...selectedItems } });
            }}
          >
            Get Suggestions
          </Button>
        </>
      )}
    </>
  );
};

export default Curation;
