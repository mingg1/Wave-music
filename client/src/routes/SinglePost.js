import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography, Button, Divider } from '@mui/material';
import TokenContext from '../contexts/token-context';
import ImageCard from '../components/ImageCard';
import GridContainer from '../components/GridContainer';
import TrackCard from '../components/TrackCard';
import { connect } from 'react-redux';
import CommentBox from '../components/CBox';
import { useNavigate, Link, useParams } from 'react-router-dom';
import LoadingIcon from '../components/LoadingIcon';
import { mapDispatchToProps, mapStateToProps } from '../queries/commentQuery';

const POST = gql`
  query Query($postId: ID!, $type: String!) {
    post(postId: $postId) {
      id
      title
      description
      owner {
        id
        nickname
      }
      createdAt
    }
    comments(type: $type, pageId: $postId) {
      owner {
        id
        nickname
      }
      text
      id
      createdAt
    }
  }
`;

const SinglePost = ({ state, getFetchedComments }) => {
  const { comments } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { loading, error, data } = useQuery(POST, {
    variables: { postId: id, type: 'post' },
  });
  const getTypeAndId = () => ({ type: 'post', refId: id });

  useEffect(() => {
    if (data?.comments) {
      getFetchedComments(data.comments);
    }
  }, [loading]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Typography component="h1" variant="h2">
            {data.post.title}
          </Typography>
          <Link to={`/user/${data.post.owner?.id}`}>
            {data.post.owner?.nickname}
          </Link>
          <Typography component="span">
            Created:{' '}
            {new Date(+data.post.createdAt).toLocaleDateString('en-EN')}
          </Typography>
          {data.post.owner.id === loggedInUser.id && (
            <div style={{ display: 'flex' }}>
              <Button
                variant="filled"
                style={{ width: 30 }}
                onClick={() => {
                  navigate('write');
                }}
              >
                Edit
              </Button>
              <Button
                variant="filled"
                style={{ width: 30 }}
                onClick={() => {
                  navigate('write');
                }}
              >
                Delete
              </Button>
            </div>
          )}
          <Divider />
          <Typography>{data.post.description}</Typography>

          {loggedInUser && <CommentBox getTypeAndId={getTypeAndId} />}
          {Array.isArray(comments) &&
            comments?.map((comment) => (
              <div>
                <span>
                  {comment.owner.nickname}
                  {': '}
                </span>
                <span>{comment.text}</span>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
