import {
    Container,
    Typography,
    Paper,
    Box,
    Divider,
} from "@mui/material";

export default function AboutPage() {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    About This App
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" paragraph>
                    This is a modern and user-friendly URL shortener built with:
                </Typography>

                <ul>
                    <li><Typography variant="body1">ASP.NET Core Web API backend</Typography></li>
                    <li><Typography variant="body1">React frontend using Vite</Typography></li>
                    <li><Typography variant="body1">Material UI for styling</Typography></li>
                    <li><Typography variant="body1">JWT-based authentication</Typography></li>
                </ul>

                <Typography variant="body1" paragraph>
                    Authenticated users can:
                </Typography>

                <ul>
                    <li><Typography variant="body1">Create short links</Typography></li>
                    <li><Typography variant="body1">Manage (view/delete) their own links</Typography></li>
                    <li><Typography variant="body1">View detailed stats per link</Typography></li>
                </ul>

                <Typography variant="body1" paragraph>
                    Admins have additional capabilities to manage all links in the system.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    Built as a full-stack project to demonstrate clean architecture, REST API integration, and secure role-based access control.
                </Typography>
            </Paper>
        </Container>
    );
}