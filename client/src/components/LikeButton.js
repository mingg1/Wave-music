import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
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
  const [liked, setLiked] = useState(false);
  const [addFavorite] = useMutation(TOGGLE_FAVORITE);

  useEffect(() => {
    console.log(trackId, type, userId, isLiked);
    setLiked(isLiked);
  }, [isLiked]);
  // ♥ ♡
  return (
    <Button
      size="x-small"
      style={{ fontSize: 25, padding: 0 }}
      onClick={() => {
        saveFavorite(trackId, type, userId, addFavorite);
        setLiked((prev) => !prev);
      }}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};

export default LikeButton;
