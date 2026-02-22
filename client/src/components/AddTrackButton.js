import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Button, Modal, TextField } from '@mui/material';
import { SubTitle } from './Typographies';
import styled from 'styled-components';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../queries/userPlaylistQuery';

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

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50vw;
  height: 50vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const makePlaylist = async (name, userId, mutation, addPlayist) => {
  try {
    const { data } = await mutation({ variables: { name, userId } });
    if (data) {
      addPlayist(data?.addPlayLists);
    }
  } catch (err) {
    console.error(err);
  }
};

const ChildModal = ({ userId, mutation, addPlayList }) => {
  const [plName, setPlName] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
        onClick={handleOpen}
      >
        {' '}
        Add new playlist
      </Button>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <ModalBox>
          <SubTitle>Make new playlist</SubTitle>
          <TextField
            label="Playlist name"
            variant="standard"
            placeholder="Playlist"
            required
            fullWidth
            onChange={(evt) => setPlName(evt.target.value)}
          />
          <div style={{ display: 'flex', gap: 16, marginTop: 60 }}>
            <Button
              style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
              onClick={() => {
                makePlaylist(plName, userId, mutation, addPlayList);
                handleClose();
              }}
            >
              MAKE PLAYLIST
            </Button>
            <Button
              style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </ModalBox>
      </Modal>
    </>
  );
};

const AddTrackButton = ({ trackId, userId, state, addPlayList, addTrack }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addTrackMutation] = useMutation(ADD_TRACK_TO_PLAYLIST);
  const [addPlaylistMutation] = useMutation(ADD_PLAYLIST);
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
        <ModalBox>
          <SubTitle>ADD TO PLAYLIST</SubTitle>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {userPlaylist &&
              userPlaylist.map((pl) => {
                return (
                  <Button
                    style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
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

          <ChildModal
            userId={userId}
            mutation={addPlaylistMutation}
            addPlayList={addPlayList}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackButton);
