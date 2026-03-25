import { IconButton, Paper, Typography } from "@mui/material";
import "./MapOverlayCard.css";

interface MapOverlayCardProps {
  title: string;
  text: string;
  onClose: () => void;
  eyebrow?: string;
}

export const MapOverlayCard = ({
  title,
  text,
  onClose,
  eyebrow = "Tracking Map"
}: MapOverlayCardProps) => {
  return (
    <Paper elevation={0} className="map-overlay-card">
      <div className="map-overlay-card__header">
        <div>
          <Typography variant="overline" className="map-overlay-card__eyebrow">
            {eyebrow}
          </Typography>
          <Typography variant="h5" className="map-overlay-card__title">
            {title}
          </Typography>
        </div>
        <IconButton
          aria-label="close map details"
          className="map-overlay-card__close"
          onClick={onClose}
          size="small"
        >
          <span className="map-overlay-card__close-text">x</span>
        </IconButton>
      </div>
      <Typography variant="body2" className="map-overlay-card__text">
        {text}
      </Typography>
    </Paper>
  );
};
