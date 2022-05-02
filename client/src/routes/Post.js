import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../store';
import PostCard from '../components/PostCard';
import LoadingIcon from '../components/LoadingIcon';

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
    console.log(loading, data);
    if (data && posts.length === 0) {
      fetchPost(data.posts);
    }
    console.log(posts);
  }, [loading, posts]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="h1" variant="h2">
        DJ Station
      </Typography>
      <Typography component="h2" variant="h4">
        Share your taste and stories!
      </Typography>
      {(loading || error) && <LoadingIcon />}
      {posts && (
        <>
          {posts.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
          <Button
            variant="contained"
            onClick={() => {
              navigate('write');
            }}
          >
            Write post
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (data) => {
    dispatch(fetchPost(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
