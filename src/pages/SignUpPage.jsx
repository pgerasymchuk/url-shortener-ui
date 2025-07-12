import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    Alert,
    Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { register } from "../api/endpoints";
import {useAuth} from "../providers/authProvider.jsx";

export default function SignUpPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        registerAsAdmin: false,
    });
    const {setToken} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckbox = (e) => {
        setForm({ ...form, registerAsAdmin: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await register(form);
            const token = response.data.accessToken || response.data;
            setToken(token);
            navigate("/", {replace: true});
        } catch (err) {
            console.error(err); F
            setError("Registration failed. Try a different email.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Sign Up
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.registerAsAdmin}
                                onChange={handleCheckbox}
                            />
                        }
                        label="Register as Admin"
                        sx={{ mt: 1 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Register
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account?{" "}
                        <Link component={RouterLink} to="/signin">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}