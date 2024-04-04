import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link as LinkMui,
    Grid,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../../services/AuthenticationService';

const defaultTheme = createTheme();

export default function SignUp() {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await signUpUser(data.get('firstName'), data.get('lastName'), data.get('username'), data.get('password'));
        if (response.username) {
            navigate(`/presence/${response.username}`)
            setMessage('signup successful')
        }
        else
            setMessage(response)
        setOpen(true);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert
                        onClose={() => setOpen(false)}
                        severity={message === "signup successful" ? 'success' : 'error'}
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    <LinkMui variant="body2">
                                        Already have an account? Sign in
                                    </LinkMui>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}