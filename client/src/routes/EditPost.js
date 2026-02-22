import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../contexts/auth-context';
import { Typography, TextField, Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import { editPost } from '../store';
import { EDIT_POST, SINGLE_POST } from '../queries/singlePostQuery';

const EditPost = ({ editPost }) => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postEditLoading, setPostEditLoading] = useState(false);
  const { loading, error, data } = useQuery(SINGLE_POST, {
    variables: { postId: id, type: 'post' },
  });
  const [editPostMutation] = useMutation(EDIT_POST);
  const owner = JSON.parse(localStorage.getItem('user'))?.id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isLoggedIn || owner !== data?.post?.owner?.id) {
      navigate('/post');
    }
  }, [loading, error]);

  const EditPost = async (data) => {
    const { title, description } = data;
    setPostEditLoading(true);
    try {
      const { data } = await editPostMutation({
        variables: { postId: id, title, description },
      });

      if (data) {
        setPostEditLoading(false);
        console.log(data.editPost);
        editPost(data.editPost);
        navigate(-1);
      }
    } catch (error) {
      setPostEditLoading(false);
      console.error(error);
    }
  };

  const onError = (error) => {
    console.log(error, errors);
  };

  return (
    <div style={{ height: '100%', paddingTop: 80, width: '60%' }}>
      <Typography component="h1" variant="h4">
        Edit Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit(EditPost, onError)}>
        <Controller
          name="title"
          control={control}
          render={() => (
            <TextField
              {...register('title')}
              defaultValue={data?.post?.title}
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
              defaultValue={data?.post?.description}
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
          disabled={postEditLoading}
        >
          Edit Post
        </Button>
      </Box>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editPost: (post) => {
    dispatch(editPost(post));
  },
});

export default connect(null, mapDispatchToProps)(EditPost);
