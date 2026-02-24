import React, { useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../contexts/auth-context';
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';

const REGISTER = gql`
  mutation RegisterUser(
    $nickname: String!
    $password: String!
    $email: String!
  ) {
    registerUser(nickname: $nickname, password: $password, email: $email) {
      id
      nickname
      email
      token
    }
  }
`;

const Signup = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userRegister] = useMutation(REGISTER);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSignup = async (data) => {
    const { nickname, email, password } = data;
    setLoading(true);

    try {
      const {
        error,
        data: { registerUser: user },
      } = await userRegister({
        variables: {
          nickname,
          email,
          password,
        },
      });

      if (user) {
        // setLoading(false);
        navigate('/login');
      }
      if (!user || error) {
        setLoading(false);
        console.log(error);
        setLoginError('User not found, please try again!');
      }
    } catch (error) {
      setLoading(false);
      setLoginError('User not found, please try again!');
    }
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <div
      style={{ height: '100%', paddingTop: 80, width: '60%', maxWidth: 480 }}
    >
      <Typography component="h1" variant="h4">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleSignup, onError)}>
        <Controller
          name="nickname"
          control={control}
          rules={{
            pattern: {
              minLength: {
                value: 3,
                message: 'Nickname should be more than 3 letters.',
              },
            },
          }}
          render={() => (
            <TextField
              {...register('nickname')}
              type="text"
              margin="normal"
              required
              fullWidth
              label="Nickname"
            />
          )}
        />
        <Typography style={{ marginTop: '2px' }}>
          {errors?.nickname?.message}
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={{
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email form!',
            },
          }}
          render={() => (
            <TextField
              {...register('email')}
              type="email"
              margin="normal"
              required
              fullWidth
              label="Email Address"
            />
          )}
        />
        <Typography style={{ marginTop: '2px' }}>
          {errors?.email?.message}
        </Typography>
        <Controller
          name="password"
          control={control}
          rules={{
            minLength: {
              value: 6,
              message: 'Password should be more than 6 letters.',
            },
          }}
          render={() => (
            <TextField
              {...register('password')}
              type="password"
              margin="normal"
              required
              fullWidth
              label="Password"
              helperText="Password should be longer than 8 letters"
            />
          )}
        />

        <Typography style={{ marginTop: '2px' }}>
          {errors?.password?.message}
        </Typography>

        <Button
          type="submit"
          variant="outlined"
          fullWidth
          style={{ color: 'black', borderBlockColor: 'black' }}
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          <CircularProgress
            size={22}
            thickness={2}
            style={{ visibility: !loading ? 'hidden' : 'visible' }}
          />
          Sign Up
        </Button>
      </Box>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
};

export default Signup;
