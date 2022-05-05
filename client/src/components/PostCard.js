import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import LikeButton from './LikeButton';
import AddTrackButton from './AddTrackButton';
import PlayButton from './PlayButton';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/post/${post?.id}`);
      }}
      style={{
        minWidth: '80%',
        maxWidth: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: 'auto auto 16px auto',
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 24,
        flexDirection: 'column',
      }}
    >
      <Link
        to={`/post/${post?.id}`}
        style={{
          marginBottom: 8,
          textDecoration: 'none',
          fontWeight: 600,
          color: 'black',
          fontSize: '2rem',
        }}
      >
        {post?.title}
      </Link>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link
          to={`/user/${post.owner?.id}`}
          style={{
            width: 'fit-content',
            marginRight: 12,
            fontWeight: 600,
            textDecoration: 'none',
            color: '#1976d2',
            fontSize: '1.2rem',
          }}
        >
          {post.owner?.nickname}
        </Link>
        <Typography component="span" fontFamily="Montserrat">
          {new Date(+post?.createdAt).toLocaleDateString('fi-FI')}
        </Typography>
      </div>
      <hr />
      <Typography component="p" fontFamily="Montserrat" color="gray">
        {post?.description?.length > 50
          ? `${post?.description?.slice(0, 20)}...`
          : post?.description}
      </Typography>
    </div>
  );
};
export default PostCard;
