import React, { useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../contexts/auth-context';
import { Typography, TextField, Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import { addPost } from '../store';

const ADD_POST = gql`
  mutation AddPost($owner: ID!, $title: String!, $description: String!) {
    addPost(owner: $owner, title: $title, description: $description) {
      id
      title
      description
      owner {
        id
        nickname
      }
      createdAt
    }
  }
`;

const WritePost = ({ addPost }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [addPostMutation] = useMutation(ADD_POST);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/post');
    }
  }, []);

  const writePost = async (data) => {
    const { title, description } = data;
    setLoading(true);
    try {
      const owner = JSON.parse(localStorage.getItem('user')).id;
      console.log(title, description, owner);
      const { data } = await addPostMutation({
        variables: { owner, title, description },
      });

      if (data) {
        setLoading(false);
        addPost(data.addPost);
        navigate('/post');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onError = (error) => {
    console.log(error, errors);
  };

  return (
    <div style={{ height: '100%', paddingTop: 80, width: '60%' }}>
      <Typography component="h1" variant="h4">
        Write Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit(writePost, onError)}>
        <Controller
          name="title"
          control={control}
          render={() => (
            <TextField
              {...register('title')}
              type="title"
              margin="normal"
              required
              fullWidth
              label="Title"
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
            />
          )}
        />
        <Controller
          name="discription"
          control={control}
          render={() => (
            <TextField
              {...register('description')}
              type="description"
              margin="normal"
              required
              fullWidth
              label="description"
              multiline
              rows={20}
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Write Post
        </Button>
      </Box>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => {
    dispatch(addPost(post));
  },
});

export default connect(null, mapDispatchToProps)(WritePost);
