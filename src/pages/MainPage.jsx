import {
    Container,
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Box,
} from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Delete, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getMyUrls,
    getAllUrls,
    createUrl,
    deleteUrl,
} from "../api/endpoints";
import {useAuth} from "../providers/authProvider.jsx";

export default function MainPage() {
    const [urls, setUrls] = useState([]);
    const [originalUrl, setOriginalUrl] = useState("");
    const [isAdminView, setIsAdminView] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const {setToken} = useAuth();

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchUrls = async () => {
        try {
            const response = isAdmin && isAdminView ? await getAllUrls() : await getMyUrls();
            setUrls(response.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/", { replace: true });
            }
        }
    };

    useEffect(() => {
        setIsAdmin(true);
        fetchUrls();
    }, [isAdminView]);

    const handleCreate = async () => {
        if (!originalUrl.trim()) return;
        await createUrl({ originalUrl });
        setOriginalUrl("");
        fetchUrls();
    };

    const handleDelete = async (id) => {
        await deleteUrl(id);
        fetchUrls();
    };

    const handleDetails = (id) => {
        navigate(`/url/${id}`);
    };

    const handleLogout = () => {
        setToken();
        navigate("/", { replace: true });
    };

    return (
        <Container maxWidth="md">
            <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
                <Toolbar sx={{ justifyContent: "flex-end" }}>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                URL Shortener
            </Typography>

            <Paper sx={{ p: 2, mb: 4 }}>
                <Box display="flex" gap={2}>
                    <TextField
                        fullWidth
                        label="Original URL"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleCreate}>
                        Shorten
                    </Button>
                </Box>
                {isAdmin && (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAdminView}
                                onChange={(e) => setIsAdminView(e.target.checked)}
                            />
                        }
                        label="Show all URLs"
                        sx={{ mt: 2 }}
                    />
                )}
            </Paper>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Original URL</TableCell>
                            <TableCell>Shortened URL</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urls.map((url) => (
                            <TableRow key={url.id}>
                                <TableCell>
                                    <a
                                        href={url.originalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {url.originalUrl}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a
                                        href={`${apiBaseUrl}${url.shortUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {`${apiBaseUrl}${url.shortUrl}`}
                                    </a>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleDetails(url.id)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(url.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {urls.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No URLs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}