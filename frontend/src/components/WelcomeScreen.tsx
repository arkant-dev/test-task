import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <Box className="welcome-screen">
      <Container maxWidth="lg">
        <Box className="welcome-panel">
          <Stack direction={{ xs: "column", md: "row" }} spacing={0} className="welcome-layout">
            <Stack spacing={3} className="welcome-content">
              <Chip label="Live Tracking Dashboard" className="welcome-chip" />
              <Typography variant="h1" className="welcome-heading">
                Track every move on one map.
              </Typography>
              <Typography variant="h5" className="welcome-description">
                Welcome to the control view for monitored objects. Open the map, inspect
                the first markers, and prepare the screen for websocket-driven updates from
                the server.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="welcome-actions">
                <Button variant="contained" size="large" onClick={onStart} className="welcome-button">
                  Розпочати
                </Button>
              </Stack>
            </Stack>

            <Box className="welcome-visual">
              <Box className="welcome-preview">
                <Box className="welcome-grid" />
                <Box className="welcome-dot welcome-dot-start" />
                <Box className="welcome-dot welcome-dot-end" />
                <Box className="welcome-connection" />
                <Box className="welcome-preview-card">
                  <Typography variant="overline" className="welcome-preview-label">
                    Live Preview
                  </Typography>
                  <Typography variant="h6" className="welcome-preview-title">
                    Two initial positions are ready on the map.
                  </Typography>
                  <Typography variant="body2" className="welcome-preview-text">
                    The next screen opens a full viewport Leaflet map with the base tracking
                    markers.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
