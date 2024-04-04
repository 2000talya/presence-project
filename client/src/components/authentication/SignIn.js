import React, { useState } from 'react';
import {
    Avatar,
    CssBaseline,
    Button,
    FormControlLabel,
    TextField,
    Checkbox,
    Link as LinkMui,
    Grid,
    Box,
    Typography,
    Container,
    Alert,
    Snackbar
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../../services/AuthenticationService';

const defaultTheme = createTheme();

const SignIn = () => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await signInUser(data.get('username'), data.get('password'))
        if (response.username) {
            navigate(`/presence/${response.username}`)
            setMessage('login successful')
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
                        severity={message === "login successful" ? 'success' : 'error'}
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    <LinkMui variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </LinkMui>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
export default SignIn;