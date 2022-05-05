import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@mui/material';

const DeleteDialog = ({ type, handleDelete, handleClose, isOpened }) => (
  <Dialog
    open={isOpened}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Delete {type}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure that you want to delete this {type}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog;
