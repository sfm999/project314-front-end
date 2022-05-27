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

// import { setSession } from '../../utils/jwt';
import axios from "../../utils/axios";
import { useNavigate } from "react-router";

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

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  role: "C",
  password: "",
};

export default function SignUp() {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState(defaultValues);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const register = async (first_name, last_name, email, roll, password) => {
    await axios
      .post("/users/register/", {
        first_name,
        last_name,
        email,
        role: roll,
        password,
      })
      .then(function (response) {
        if (response.status === 201) {
          window.localStorage.setItem("logged-in", "true");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.append("role", "C");
    register(
      data.get("first_name"),
      data.get("last_name"),
      data.get("email"),
      data.get("role"),
      data.get("password")
    );
    console.log(data.get("role"));
    window.localStorage.setItem("role", data.get("role"));
    if (window.localStorage.getItem("logged-in") === "true") {
      navigate("/customer/home");
    }
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
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="age"
                label="Age"
                type="text"
                id="age"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="gender"
                label="Gender"
                type="text"
                id="gender"
                variant="outlined"
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
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
