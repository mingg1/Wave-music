import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "@mui/material";
import TokenContext from "../contexts/token-context";


const TOGGLE_FAVORITE = gql`
  mutation Mutation($id: ID, $type: String, $userId: ID) {
    addFavorite(id: $id, type: $type, userId: $userId) {
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
  console.log("items: ", items);
  // setUserFavorites(items);
};

const LikeButton = (props) => {
  const { trackId, type, userId, isLiked } = props;
  const { refetchFavorites } = useContext(TokenContext);
  const [liked, setLiked] = useState(false);
  const [addFavorite, { data }] = useMutation(TOGGLE_FAVORITE);

  useEffect(() => {
    // console.log("info: ", trackId, type, userId, isLiked);
    setLiked(isLiked);
  }, [isLiked]);
  // ♥ ♡

  const handleClick = async () => {
    setLiked((prev) => !prev);
    try {
      await addFavorite({
        variables: {
          id: trackId,
          type,
          userId,
        },
      });
      await refetchFavorites();
    } catch (error) {
      console.error(error);
      setLiked((prev) => !prev);
    }
  };

  return (
    <Button
      size="x-small"
      style={{ fontSize: 25, padding: 0 }}
      onClick={handleClick}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};

export default LikeButton;
