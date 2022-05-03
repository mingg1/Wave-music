import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Divider,
  Dialog,
} from '@mui/material';
import { mapDispatchToProps } from '../queries/commentQuery';

const DELETE_COMMENTS = gql`
  mutation DeleteComment($commentId: ID) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

const Comment = ({ commentData, loggedInUser, deleteComment }) => {
  const [deleteCommentsMutation] = useMutation(DELETE_COMMENTS);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);
  const handleDelete = async () => {
    try {
      await deleteCommentsMutation({
        variables: { commentId: commentData.id },
      });
      deleteComment(commentData.id);
      handleClose(open);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: 12,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure that you want to delete this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={`/user/${commentData?.owner?.id}`}>
            {commentData?.owner?.nickname}
          </Link>
          <Typography component="p">{commentData?.text}</Typography>
          <Typography component="span">
            {new Date(+commentData.createdAt).toLocaleDateString('fi-FI')}
          </Typography>
        </div>
        {loggedInUser === commentData.owner.id && (
          <Button
            size="x-small"
            style={{ fontSize: 25, padding: 0 }}
            onClick={handleClose}
          >
            <RiDeleteBin6Line />
          </Button>
        )}
      </div>
      <Divider style={{ marginTop: 16 }} />
    </>
  );
};

export default connect(null, mapDispatchToProps)(Comment);
