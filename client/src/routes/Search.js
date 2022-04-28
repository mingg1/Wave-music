import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import LikeButton from '../components/LikeButton';
import { useLocation, useParams, Link } from 'react-router-dom';
import TokenContext from '../contexts/token-context';

const Search = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { fetchToken, userFavorites } = useContext(TokenContext);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let foo = params.get('query');
  console.log(foo);

  //   const { loading, data, error } = useQuery(GET_PL_TRACKS, {
  //     variables: { playlistId: id },
  //   });

  //   useEffect(() => {
  //     if (!loading && error) {
  //       fetchToken();
  //     }
  //   }, [error, userFavorites]);

  return <div className="App"></div>;
};

export default Search;
