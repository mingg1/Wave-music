import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@mui/material';
import { deleteTracks } from '../store';

const DELETE_TRACK_FROM_PL = gql`
  mutation Mutation($playlistId: ID!, $trackId: ID!) {
    deleteTrackFromPlaylist(playlistId: $playlistId, trackId: $trackId) {
      id
    }
  }
`;

const DeleteTrackBtn = ({ trackId, deleteTrack, state }) => {
  const [deleteTrackMutation] = useMutation(DELETE_TRACK_FROM_PL);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const handleClose = () => setOpen(!open);
  const handleDelete = async () => {
    try {
      await deleteTrackMutation({
        variables: { playlistId: id, trackId },
        update(cache) {
          const deletedTrackId = cache.identify({
            __typename: 'Track',
            id: trackId,
          });
          cache.evict({ id: deletedTrackId });
          cache.gc();
        },
      });
      deleteTrack({ playlistId: id, trackId });
      handleClose(open);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Track</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to delete this track from the playlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Button
        size="x-small"
        style={{ fontSize: 25, padding: 0 }}
        onClick={handleClose}
      >
        <RiDeleteBin6Line />
      </Button>
    </>
  );
};
const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => ({
  deleteTrack: (data) => {
    dispatch(deleteTracks(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteTrackBtn);
