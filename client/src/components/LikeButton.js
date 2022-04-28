import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';

import { Button } from '@mui/material';

const TOGGLE_FAVORITE = gql`
  mutation Mutation($itemId: ID, $type: String, $userId: ID) {
    addFavorite(id: $itemId, type: $type, userId: $userId) {
      tracks {
        id
        name
      }
      albums {
        id
      }
      artists {
        id
      }
    }
  }
`;

const saveFavorite = async (itemId, type, userId, mutation) => {
  console.log(itemId, type, userId);
  const {
    error,
    data: { addFavorite: items },
  } = await mutation({
    variables: {
      itemId,
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

  useEffect(() => {
    // setLiked(isLiked);
  }, [isLiked]);
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
