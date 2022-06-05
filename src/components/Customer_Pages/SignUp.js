import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { green } from "@mui/material/colors";

import axios from "../../utils/axios";
import { useNavigate } from "react-router";

// Custom text area with handlers for missing values, on-focus, etc.
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

export default function SignUp() {
  // Allows for on-the-fly navigation of url's as well as taking data in
  let navigate = useNavigate();

  // This function performs the API call and submitting the data
  // returns a promise which we extract the status from for verification of success
  const register = async (first_name, last_name, email, role, password) => {
    const res = await axios
      .post("/users/register/", {
        first_name,
        last_name,
        email,
        role,
        password,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return res;
  };

  // This function actually gets the data from the form, then it calls
  // register(), providing the information gathered from the form.
  // Extracts the status from the promise register() returns, and redirects on successful creation (status code 201)
  const handleSubmit = (event) => {
    // Don't refresh the page
    event.preventDefault();
    // Get the data from the form
    const data = new FormData(event.currentTarget);

    // Custom appendment of 'role' key with value of 'C' for Customer
    data.append("role", "C");
    // Set local storage of the role to handle early navbar issues of displaying incorrect links
    window.localStorage.setItem("role", data.get("role"));

    // Calling the register function with the values gotten from the form data
    register(
      data.get("first_name"),
      data.get("last_name"),
      data.get("email"),
      data.get("role"),
      data.get("password")
    ).then((res) => {
      // Check for successful creation (code 201)
      if (res.status === 201) {
        // Navigate to sign in screen and pass the email for auto-population
        navigate("/customer/sign-in", {
          state: {
            email: data.get("email"),
          },
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ boxShadow: 2 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          paddingBottom: "10px",
          paddingTop: "7px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: green[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Client Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextBox
                required
                fullWidth
                name="first_name"
                label="First Name"
                type="First Name"
                id="first_name"
                variant="outlined"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextBox
                required
                fullWidth
                name="last_name"
                label="Last Name"
                type="Last Name"
                id="last_name"
                variant="outlined"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                variant="outlined"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                variant="outlined"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/customer/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
