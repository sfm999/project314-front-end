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
import { deepOrange } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { setSession } from "../../utils/jwt";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { Alert, Snackbar } from "@mui/material";


//styling for the textbox
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

//user default values
const defaultValues = {
  email: "",
  password: "",
};
//temporary values
const tempValues = {
  email: "",
  password: "",
};

const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ContractorSignIn() {
  const { login } = useAuth(); //login details from userAuth

  const [formValues, setFormValues] = useState(defaultValues); //sign in form values
  const [error, setError] = useState(false);
  const navigate = useNavigate(); //allows navigation to different webpages
  

  const handleFormChange = (e) => { //updates values when they are changed in the form
    const { name, value } = e.target;

    setFormValues({ //sets the form values
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /* Trying to get the status code from the PromiseResult that login returns */
    login(data.get("email"), data.get("password"), () => {setError(true);}).then((res) => {
      if (res === 200) {
        window.localStorage.setItem("role", "S");
        navigate("/contractor/home");
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
        <Avatar sx={{ m: 2, bgcolor: deepOrange[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contractor Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
            variant="outlined"
            autoComplete="new-password"
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
              <Link href="/contractor/sign-up" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
