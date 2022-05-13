import * as React from 'react';
import {useState} from 'react';
import { alpha, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import { green } from '@mui/material/colors';

import { setSession } from '../../utils/jwt';
import axios from '../../utils/axios';

const TextBox = styled(TextField) ({
  '& input:valid + fieldset': {
    borderColor: 'green',
      borderWidth: 2,
  },
  '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },
    },
})

const defaultValues = {
  email: "",
  password: "",
}

const theme = createTheme();

export default function SignIn() {

  const [formValues, setFormValues] = useState(defaultValues);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const login = async (email, password) => {

    await axios.post('/token/', { email, password,})
    .then(response => {
      console.log(response.data.access)
      setSession(response.data.access)
    })
    .catch(error => {console.log(error)})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login(data.get('email'), data.get('password'));
  };

  


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: green[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Client Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              id="email"
              variant="outlined"
              autoComplete="email"
              autoFocus
              onChange={handleFormChange}
            />
            <TextBox
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleFormChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}