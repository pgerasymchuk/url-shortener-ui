import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Alert,
    Divider,
    Button,
} from "@mui/material";
import { getUrlDetails } from "../api/endpoints";

export default function UrlDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await getUrlDetails(id);
            setUrl(response.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                navigate("/", {replace: true});
            } else {
                setError("Failed to load URL details.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            URL Details
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" color="text.secondary">
                            Original URL
                        </Typography>
                        <Typography gutterBottom>
                            <a
                                href={url.originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >{url.originalUrl}
                            </a>
                        </Typography>

                        <Typography variant="subtitle2" color="text.secondary">
                            Shortened URL
                        </Typography>
                        <Typography gutterBottom>
                            <a
                                href={`${apiBaseUrl}${url.shortUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`${apiBaseUrl}${url.shortUrl}`}
                            </a>
                        </Typography>

                        <Typography variant="subtitle2" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography gutterBottom>
                            {new Date(url.createdAt).toLocaleString()}
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 4 }}
                            onClick={() => navigate("/")}
                        >
                            Back to Main Page
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
}
