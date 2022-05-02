import React, { useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';
import TokenContext from '../contexts/token-context';
import styled from 'styled-components';
import { Button, Typography, TextField } from '@mui/material';
import Carousel from 'react-elastic-carousel';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { fetch } from '../store';

const GET_PL = gql`
  {
    featuredPaylists {
      id
      name
      images {
        url
      }
      description
      collaborative
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10% 0 10%;
`;

const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 85%;
  grid-gap: 30px 0;
`;

const PlaylistItemContainer = styled.div`
  width: fit-content;
`;

const GET_USER_PLAYLISTS = gql`
  query UserPlaylists($userId: ID!) {
    userPlaylists(userId: $userId) {
      id
      name
      userMade
      tracks {
        id
      }
    }
  }
`;

export const getPlaylists = async (getUserPlaylists) => {
  try {
    const { data } = await getUserPlaylists({
      variables: {
        userId: JSON.parse(localStorage.getItem('user'))?.id,
      },
    });

    return data?.userPlaylists;
  } catch (e) {
    console.log(e);
  }

  //  setUserPlaylists((prevState) => userPlaylists);
};

const mapDispatchToProps = (dispatch) => ({
  getPlaylists: async (getUserPlaylists) =>
    dispatch(fetch(await getPlaylists(getUserPlaylists))),
});

const searchOptions = [
  { value: 'album', label: 'Album' },
  { value: 'artist', label: 'Artist' },
  { value: 'track', label: 'Track' },
  { value: 'user', label: 'User' },
  { value: 'all', label: 'All' },
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 100,
      width: 250,
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const { fetchToken, sfToken } = useContext(TokenContext);
  const { loading, error, data, refetch } = useQuery(GET_PL);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const handleSearchOptionChange = (selectedOption) => {
    setSelectedSearchOption(selectedOption.value);
  };

  useEffect(() => {
    // validation
    //  fetchToken();
    if (!loading && error) {
      fetchToken();
      refetch();
    }
    //  getPlaylists(getUserPlaylists);
    // update or not
  }, [error, data]);

  return (
    <Container>
      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={handleSubmit((data) => {
          console.log(selectedSearchOption);
          const { searchQuery } = data;
          navigate({
            pathname: 'search',
            search: createSearchParams({
              type: selectedSearchOption,
              query: searchQuery,
            }).toString(),
          });
        })}
      >
        <Select
          options={searchOptions}
          onChange={handleSearchOptionChange}
          placeholder="Search By..."
          MenuProps={MenuProps}
        />
        <Controller
          name="searchQuery"
          control={control}
          render={() => (
            <TextField
              {...register('searchQuery')}
              type="text"
              margin="normal"
              required
              label="Search by"
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ height: 56, ml: 5 }}>
          Search
        </Button>
      </form>

      <Typography component="h1" variant="h4">
        Featured playlists
      </Typography>

      <Carousel itemsToShow={4} itemsToScroll={4}>
        {data &&
          data.featuredPaylists.map((pl) => {
            return (
              <div key={pl.id} style={{ width: 'fit-content' }}>
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                >
                  <img
                    src={pl.images[0].url}
                    style={{ width: 140, borderRadius: 15 }}
                  />
                </Link>
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                >
                  <h5>{pl.name}</h5>
                </Link>
              </div>
            );
          })}
      </Carousel>
    </Container>
  );
};

export default connect(null, mapDispatchToProps)(Home);
