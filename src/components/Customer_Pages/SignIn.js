import React, { forwardRef, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { green } from "@mui/material/colors";

import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

// Custom textbox declaration and definition
const TextBox = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});

// Default values for form handling style
const defaultValues = {
  email: "",
  password: "",
};

const CustomAlert = forwardRef(function CustomAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  // Grab the login function from the useAuth() function
  //   we imported from our custom hook, 'useAuth.js'
  const { login } = useAuth();

  // Allows for on-the-fly navigation of url's as well as taking data in
  let navigate = useNavigate();

  // Used to grab values passed with the navigate() function
  const { state } = useLocation();

  // Hold the form values in some state and set the defaultValues as initial value
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(false);

  // Responsible for updating the data in 'formValues' as it is entered in the form
  // See EditVehicle.js' version for more details
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function containing logic for submission of the form
  const handleSubmit = (event) => {
    // Prevent page from refreshing on form submit
    event.preventDefault();

    // Get the data from the form
    const data = new FormData(event.currentTarget);

    // Invoke the login function we grabbed from useAuth
    // Pass in the data gotten from the form
    login(data.get("email"), data.get("password"), () => {setError(true)}).then((res) => {
      // Check for successful login (status 200)
      if (res === 200) {
        // Set role as customer for preventing navbar issues
        window.localStorage.setItem("role", "C");
        // Navigate to the homescreen for customers
        navigate("/customer/home");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Snackbar open={error} autoHideDuration={10000} onClose={() => setError(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <CustomAlert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
            Invalid values!
          </CustomAlert>
        </Snackbar> 
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
            autoFocus={state ? false : true}
            onChange={handleFormChange}
            defaultValue={state ? state.email : ""}
          />
          <TextBox
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoFocus={state ? true : false}
            autoComplete="current-password"
            onChange={handleFormChange}
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
            <Grid item>
              <Link href="/customer/sign-up" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
