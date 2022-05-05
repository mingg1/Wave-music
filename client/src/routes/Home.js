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
import { SubTitle } from '../components/Typographies';

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
  margin-top: 10vh;
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
      <Typography
        component="h1"
        variant="h4"
        fontSize="6rem"
        fontFamily="Montserrat"
      >
        Wave
      </Typography>
      <Typography
        component="h2"
        variant="h2"
        fontSize="2rem"
        fontWeight={600}
        fontFamily="Montserrat"
      >
        Music around you 🎵
      </Typography>
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
          styles={{ width: 300 }}
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
              sx={{ width: '40vw' }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ height: 56, ml: 5, fontFamily: 'Montserrat', fontWeight: 600 }}
        >
          Search
        </Button>
      </form>
    </Container>
  );
};

export default Home;
