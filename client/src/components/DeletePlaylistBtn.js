import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteDialog from '../components/DeleteDialog';
import { useMutation } from "@apollo/client/react";
import {
  DELETE_PLAYLIST,
  mapDispatchToProps,
} from '../queries/userPlaylistQuery';
import { connect } from 'react-redux';

const DeletePlaylistBtn = ({ deletePlaylist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deletePlMutation] = useMutation(DELETE_PLAYLIST);
  const handleClose = () => setOpen(!open);
  const handleDelete = async () => {
    try {
      const { data } = await deletePlMutation({
        variables: { playlistId: id },
        update(cache) {
          const deletedPlaylist = cache.identify({
            __typename: 'UserPlaylist',
            id,
          });
          cache.evict({ id: deletedPlaylist });
          cache.gc();
        },
      });
      if (data) {
        deletePlaylist(data?.deletePlaylist);
        handleClose(open);
        alert('The playlist has been deleted');
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
      <DeleteDialog
        type="playlist"
        handleDelete={handleDelete}
        handleClose={handleClose}
        isOpened={open}
      />
      <RiDeleteBin6Line size={40} />
    </div>
  );
};
export default connect(null, mapDispatchToProps)(DeletePlaylistBtn);
