import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LikeButton from './LikeButton';
import AddTrackButton from './AddTrackButton';
import PlayButton from './PlayButton';

const PostCard = ({ post }) => {
  return (
    <div
      key={post.id}
      style={{
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: 'auto auto 16px auto',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to={`/post/${post?.id}`} style={{ marginBottom: 8 }}>
        {post?.title}
      </Link>
      <Link to={`/user/${post.owner?.id}`} style={{ marginBottom: 8 }}>
        {post.owner?.nickname}
      </Link>
    </div>
  );
};
export default PostCard;
