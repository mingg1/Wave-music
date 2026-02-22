import React, { useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useLazyQuery } from "@apollo/client/react";
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../contexts/auth-context';
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      nickname
      email
      token
    }
  }
`;

const Login = () => {
  const { isLoggedIn, onLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [login] = useLazyQuery(LOGIN);
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

  const handleLogin = async (data) => {
    const { email, password } = data;

    setLoading(true);

    try {
      const {
        error,
        data: { login: user },
      } = await login({
        variables: {
          email,
          password,
        },
      });

      if (user) {
        setLoading(false);
        await onLogin(user);
        navigate('/');
      }
      if (!user || error) {
        setLoading(false);
        console.log(user, error);
        setLoginError('User not found, please try again!');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoginError('User not found, please try again!');
    }
  };
  const onError = (error) => {
    console.log(error, errors);
  };

  return (
    <div
      style={{ height: '100%', paddingTop: 80, width: '60%', maxWidth: 480 }}
    >
      <Typography component="h1" variant="h4">
        Log in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleLogin, onError)}>
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
            required: true,
          }}
          render={() => (
            <TextField
              {...register('password')}
              type="password"
              margin="normal"
              required
              fullWidth
              label="Password"
            />
          )}
        />
        <Typography style={{ marginTop: '2px' }}>{loginError}</Typography>

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
          Log In
        </Button>
      </Box>
      <Link to="/signup">{"Don't have an account?"}</Link>
    </div>
  );
};

export default Login;
