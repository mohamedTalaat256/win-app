import { Helmet } from 'react-helmet-async';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Typography, Stack, IconButton, InputAdornment, TextField, Button, Collapse, Alert, Card } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import LoginValidationSchema from '../../validation/LoginValidationSchema';

export default function LoginPage() {
  const [signingIn, setSigningIn] = useState(false);
  const { setUser, setToken } = useStateContext();
  const [openResponseAlert, setOpenResponseAlert] = useState(false);
  const [response, setResponse] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginValidationSchema)
  });
  const onSubmit = formData => {

    setSigningIn(true);

    axiosClient.post('/auth/login', formData)
      .then(({ data }) => {

        console.log(data);

        setUser(data.data.userData);
        setToken(data.data.accessToken);
        setSigningIn(false);
      })
      .catch((err) => {
        setOpenResponseAlert(true);
        setResponse(err.response.data.message);
        setSigningIn(false);
      })
  };

  
  return (
    <>
      <Helmet>
        <title> Admin | Login </title>
      </Helmet>

      <Container maxWidth="sm" sx={{ marginTop: 20 }}>



        <Card sx={{ padding: 5 }}>
          <Stack spacing={3}>
            <Collapse in={openResponseAlert}>
              <Alert
                color="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="error"
                    size="small"
                    onClick={() => {
                      setOpenResponseAlert(false);
                    }}
                  >
                    x
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {response}
              </Alert>
            </Collapse>



            <Typography variant="h4" gutterBottom >
              Sign in to Admin Pandel
            </Typography>

            <TextField
              id="username"
              name="username"
              label="username"
              margin="dense"
              {...register('username')}
              error={errors.username}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>

            <TextField
              id="password"
              name="password"
              label="password"
              margin="dense"
              {...register('password')}
              error={errors.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Stack>

          {
            signingIn ?
             
              <LoadingButton sx={{ marginTop: 2 }} fullWidth size="large" variant="contained" >
              Siningin...
            </LoadingButton>
              :
              <LoadingButton sx={{ marginTop: 2 }} fullWidth size="large" variant="contained" onClick={handleSubmit(onSubmit)}>
                Login
              </LoadingButton>
          }

        </Card>
      </Container>
    </>
  );
}
