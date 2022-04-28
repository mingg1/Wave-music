import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';
import TokenContext from '../contexts/token-context';
import styled from 'styled-components';
import AuthContext from '../contexts/auth-context';
import { Button, Typography, TextField } from '@mui/material';
import Carousel from 'react-elastic-carousel';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

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

const Home = () => {
  const navigate = useNavigate();
  const { fetchToken } = useContext(TokenContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PL);
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
      // refetch();
    }
    // update or not
  }, [error]);

  const searchOptions = [
    { value: 'album', label: 'Album' },
    { value: 'artist', label: 'Artist' },
    { value: 'track', label: 'Track' },
    { value: 'user', label: 'User' },
    { value: 'all', label: 'All' },
  ];

  return (
    <Container>
      <form
        style={{ display: 'flex' }}
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

        <Button type="submit" variant="outlined">
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

export default Home;
