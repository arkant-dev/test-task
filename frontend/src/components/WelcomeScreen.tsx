import { Box, Button, Chip, Container, Stack, TextField, Typography } from "@mui/material";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  authKey: string;
  errorMessage: string;
  isConnecting: boolean;
  onAuthKeyChange: (value: string) => void;
  onStart: () => void | Promise<void>;
}

export const WelcomeScreen = ({
  authKey,
  errorMessage,
  isConnecting,
  onAuthKeyChange,
  onStart
}: WelcomeScreenProps) => {
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
                Ознайомтесь із цим додатком-трекером рухомих об&apos;єктів. Відривайте мапу і
                спостерігайте, як маркери рухаються.
              </Typography>
              <TextField
                type="password"
                label="Ключ доступу"
                value={authKey}
                onChange={(event) => onAuthKeyChange(event.target.value)}
                error={Boolean(errorMessage)}
                helperText={errorMessage || "Введіть унікальний ключ, щоб відкрити мапу"}
                autoComplete="off"
                className="welcome-key-input"
                fullWidth
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="welcome-actions">
                <Button
                  variant="contained"
                  size="large"
                  onClick={onStart}
                  className="welcome-button"
                  disabled={!authKey.trim() || isConnecting}
                >
                  {isConnecting ? "Перевірка..." : "Розпочати"}
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
                    Об&apos;єкти зникають лише через 5 хвилин після втрати зв&apos;язку.
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
