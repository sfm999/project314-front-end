import * as React from 'react';
import {useState} from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { deepOrange } from '@mui/material/colors';

// import { setSession } from '../../utils/jwt';
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
});

const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    abn: "",
    role: "S",
    password:"",
}

export default function ContractorSignUp() {
    
    const [formValues, setFormValues] = useState(defaultValues);

    const handleFormChange = (e) => {
        const { name, value } = e.target; 
    
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const register = async(first_name, last_name, email, abn, roll, password) => {

        await axios.post('/users/register', {first_name, last_name, email, abn, role: roll, password,})
        .then(function (response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        data.append('role', 'S');
        register(
            data.get('first_name'),
            data.get('last_name'),
            data.get('email'),
            data.get('abn'),
            data.get('role'),
            data.get('password'),
        );
    }

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
                <Avatar sx={{ m: 2, bgcolor: deepOrange[500] }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Contractor Sign Up
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
                    </Grid>
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
                    <TextBox
                        margin="normal"
                        required
                        fullWidth
                        name="abn"
                        label="ABN"
                        type="abn"
                        id="abn"
                        variant="outlined"
                        autoComplete="ABN"
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Link href="/ContractorSignIn" variant="body2">
                        Already have an account? Sign in
                    </Link>

                </Box>
            </Box>
        </Container>
    )
};   