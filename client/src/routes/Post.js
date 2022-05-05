import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../store';
import PostCard from '../components/PostCard';
import LoadingIcon from '../components/LoadingIcon';
import { MainTitle, SubTitle } from '../components/Typographies';

const POSTS = gql`
  {
    posts {
      id
      title
      description
      owner {
        id
        nickname
      }
      createdAt
    }
  }
`;

const Post = ({ state, fetchPost }) => {
  const { posts } = state;
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(POSTS);

  useEffect(() => {
    if (data && posts.length === 0) {
      fetchPost(data.posts);
    }
  }, [loading, posts]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {!loading && posts && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            alignItems: 'center',
          }}
        >
          <MainTitle>DJ Station</MainTitle>
          <SubTitle>♬ Share your taste and stories!</SubTitle>
          {posts.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
          <Button
            style={{
              width: 200,
              fontFamily: 'Montserrat',
              fontWeight: 600,
              borderRadius: 16,
              alignSelf: 'flex-end',
              marginTop: 24,
            }}
            variant="contained"
            onClick={() => {
              navigate('write');
            }}
          >
            Write post
          </Button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (data) => {
    dispatch(fetchPost(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
