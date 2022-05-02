import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { connect } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import {
  Button,
  Modal,
  Typography,
  Box,
  Alert,
  AlertTitle,
} from '@mui/material';
import { add, addTracks } from '../store';

const ADD_TRACK_TO_PLAYLIST = gql`
  mutation Mutation($playlistId: ID!, $trackId: ID!) {
    addTrackToPlaylist(playlistId: $playlistId, trackId: $trackId) {
      id
      tracks {
        id
      }
    }
  }
`;

const ADD_PLAYLIST = gql`
  mutation AddPlayLists($name: String!, $userId: ID!) {
    addPlayLists(name: $name, userId: $userId) {
      id
      name
      owner {
        id
      }
    }
  }
`;

const makePlaylist = async (name, userId, mutation, addPlayist) => {
  try {
    const { data } = await mutation({ variables: { name, userId } });
    if (data) {
      console.log(data);
      addPlayist(data?.addPlayLists);
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
      );
      //  getPlaylists((prevState) => [...prevState, data?.addPlayLists]);
    }
  } catch (err) {
    console.error(err);
  }
};

const AddTrackButton = ({ trackId, userId, state, addPlayist, addTrack }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addTrackMutation] = useMutation(ADD_TRACK_TO_PLAYLIST);
  const [addPlaylist] = useMutation(ADD_PLAYLIST);
  const { userPlaylist } = state;
  const [isAdded, setIsAdded] = useState(false);

  const addTrackToPlaylist = async (playlistId, trackId) => {
    try {
      const { data } = await addTrackMutation({
        variables: { playlistId, trackId },
      });
      if (data) {
        addTrack(data?.addTrackToPlaylist);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Button
        style={{ fontSize: 25, padding: 0 }}
        size="x-small"
        onClick={handleOpen}
      >
        <IoMdAdd />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            width: '50vw',
            height: '50vh',
            borderRadius: 16,
          }}
        >
          <Typography variant="h6" component="h2">
            ADD TO PLAYLIST
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {userPlaylist &&
              userPlaylist.map((pl) => {
                return (
                  <Button
                    disabled={
                      pl.tracks?.map((t) => t?.id)?.includes(trackId) || isAdded
                    }
                    onClick={(e) => {
                      addTrackToPlaylist(pl.id, trackId);
                      e.target.disabled = true;
                    }}
                  >
                    {pl.name}
                  </Button>
                );
              })}
          </div>
          <Button
            onClick={() => {
              makePlaylist('nnnn', userId, addPlaylist, addPlayist);
            }}
          >
            MAKE PLAYLIST
          </Button>
        </Box>
      </Modal>
    </>
  );
};

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayist: (playlist) => dispatch(add(playlist)),
    addTrack: (newPl) => dispatch(addTracks(newPl)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackButton);
