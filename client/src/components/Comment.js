import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button, Typography, Divider } from '@mui/material';
import { mapDispatchToProps } from '../queries/commentQuery';
import DeleteDialog from './DeleteDialog';

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
          width: '70%',
          padding: 12,
          display: 'flex',
          justifyContent: 'space-between',
          margin: 'auto',
        }}
      >
        <DeleteDialog
          isOpened={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
          type="comment"
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            to={`/user/${commentData?.owner?.id}`}
            style={{
              marginBottom: 8,
              textDecoration: 'none',
              fontWeight: 600,
              color: '#1976d2',
              fontSize: 18,
            }}
          >
            {commentData?.owner?.nickname}
          </Link>
          <Typography component="p" fontFamily="Montserrat">
            {commentData?.text}
          </Typography>
          <Typography component="span" fontFamily="Montserrat">
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
      <Divider style={{ margin: 'auto', marginTop: 16, width: '70%' }} />
    </>
  );
};

export default connect(null, mapDispatchToProps)(Comment);
