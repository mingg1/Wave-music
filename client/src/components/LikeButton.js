import { gql, useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';

import { Button } from '@mui/material';

const TOGGLE_FAVORITE = gql`
  mutation Mutation($trackId: ID, $type: String, $userId: ID) {
    addFavorite(id: $trackId, type: $type, userId: $userId) {
      tracks {
        id
        name
      }
    }
  }
`;

const saveFavorite = async (trackId, type, userId, mutation) => {
  const {
    error,
    data: { addFavorite: items },
  } = await mutation({
    variables: {
      trackId,
      type,
      userId,
    },
  });
  if (error) {
    console.log(error);
  }
  console.log(items);
  //setUserFavorites(items);
};

const LikeButton = (props) => {
  const { trackId, type, userId, isLiked } = props;
  const [liked, setLiked] = useState(isLiked);
  const [addFavorite] = useMutation(TOGGLE_FAVORITE);

  // ♥ ♡
  return (
    <Button
      size="large"
      onClick={() => {
        saveFavorite(trackId, type, userId, addFavorite);
        setLiked(!liked);
      }}
    >
      {liked ? '♥' : '♡'}
    </Button>
  );
};

export default LikeButton;
