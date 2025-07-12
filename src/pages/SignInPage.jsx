import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { login } from "../api/endpoints";
import {useAuth} from "../providers/authProvider.jsx";

export default function SignInPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {setToken} = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await login(form);
            const token = response.data.accessToken || response.data;
            setToken(token);
            navigate("/", {replace: true});
        } catch (err) {
            console.error(err);
            setError("Invalid email or password.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Sign In
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        onChange={handleChange}
                        required
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 3 }}
                    >
                        Log In
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Don't have an account?{" "}
                        <Link component={RouterLink} to="/signup">
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Paper>

            <Box display="flex" justifyContent="center" mt={5}>
                <Link component={RouterLink} to="/about">
                    About
                </Link>
            </Box>
        </Container>
    );
}
