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
                Відслідковуйте кожен рух.
              </Typography>
              <Typography variant="h5" className="welcome-description">
                Ознайомтесь із цим додатком-трекером рухомих об'єктів. Відривайте мапу і
                спостерігайте, як маркери рухаються.
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
                    200 стартових елементів на мапі.
                  </Typography>
                  <Typography variant="body2" className="welcome-preview-text">
                    Об'єкти зникають лише через 5 хвилин після втрати зв'язку.
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
