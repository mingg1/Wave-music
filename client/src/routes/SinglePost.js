import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client/react";
import { Typography, Button, Divider } from '@mui/material';
import { connect } from 'react-redux';
import CommentBox from '../components/CommentBox';
import { useNavigate, Link, useParams } from 'react-router-dom';
import LoadingIcon from '../components/LoadingIcon';
import { mapDispatchToProps, mapStateToProps } from '../queries/commentQuery';
import Comment from '../components/Comment';
import { DELETE_POST, SINGLE_POST } from '../queries/singlePostQuery';
import DeleteDialog from '../components/DeleteDialog';
import { MainTitle, SubTitle } from '../components/Typographies';

const SinglePost = ({ state, getFetchedComments, removePost }) => {
  const { comments } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
  const { loading, error, data } = useQuery(SINGLE_POST, {
    variables: { postId: id, type: 'post' },
  });
  const [deletePostMutation] = useMutation(DELETE_POST);
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleClose = () => setDialogOpened(!dialogOpened);
  const handleDelete = async () => {
    try {
      await deletePostMutation({
        variables: { postId: id },
      });
      handleClose(dialogOpened);
      removePost(id);
      navigate('/post');
      alert('The post has been deleted');
    } catch (err) {
      console.error(err);
    }
  };
  const getTypeAndId = () => ({ type: 'post', refId: id });

  useEffect(() => {
    if (data?.comments) {
      getFetchedComments(data.comments);
    }
  }, [loading]);

  return (
    <>
      {(loading || error) && <LoadingIcon />}
      {data && (
        <div
          style={{
            fontFamily: 'Montserrat',
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            padding: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <MainTitle>{data.post.title}</MainTitle>
          <SubTitle>
            Written by{'    '}
            <Link to={`/user/${data.post.owner?.id}`}>
              {data.post.owner?.nickname}
            </Link>
          </SubTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="span">
              Created:{' '}
              {new Date(+data.post.createdAt).toLocaleDateString('fi-FI')}
            </Typography>
            {data.post.owner.id === loggedInUser?.id && (
              <div style={{ display: 'flex' }}>
                <DeleteDialog
                  isOpened={dialogOpened}
                  handleClose={handleClose}
                  handleDelete={handleDelete}
                  type="post"
                />
                <Button
                  variant="filled"
                  style={{ width: 30 }}
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="filled"
                  style={{ width: 30 }}
                  onClick={handleClose}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <Divider />
          <p style={{ minHeight: 100, marginLeft: 24, fontSize: '1.2rem' }}>
            {data.post.description}
          </p>
          {loggedInUser && <CommentBox getTypeAndId={getTypeAndId} />}
          {Array.isArray(comments) &&
            comments?.map((comment) => {
              return (
                <Comment
                  commentData={comment}
                  key={comment.id}
                  loggedInUser={loggedInUser?.id}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
