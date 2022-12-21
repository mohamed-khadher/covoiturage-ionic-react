import {
  Fade,
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect } from "react";
import { ExtendedOffer } from "../Schemas/Offer";
import { getCityTextFromValue } from "../variables/cities";

export const MyReservationsCard: React.FC<ExtendedOffer> = ({
  username,
  img,
  car,
  start,
  finish,
  date,
  offerId,
  index,
  spots,
  isExpired,
  onDelete,
}) => {
  const [checked, setChecked] = useState(false);
  const [expired, setExpired] = useState(
    isExpired === undefined ? false : isExpired
  );
  useEffect(() => {
    setTimeout(() => setChecked(true), 250);
  }, []);
  const cardClickHandler = () => {
    console.log(offerId);
  };
  const delay = index ? index * 600 : 0;
  return (
    <>
      <Fade
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: delay } : {})}
      >
        <Card
          elevation={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Date : {date}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Départ - {getCityTextFromValue(start || "")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Arrivée - {getCityTextFromValue(finish || "")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Voiture : {car}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Places : {spots}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
              }}
            ></Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", height: 35 }}
            >
              {expired ? (
                <Typography
                  variant="subtitle2"
                  color="darkred"
                  component="div"
                  sx={{ m: 1 }}
                >
                  Expirée
                </Typography>
              ) : (
                <IconButton
                  aria-label="Supprimer"
                  size="large"
                  onClick={() => onDelete(offerId || "")}
                >
                  <HighlightOffIcon color="primary" />
                </IconButton>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 180,
              }}
            >
              <Avatar alt={username} src={img} sx={{ width: 70, height: 70 }} />
              <Typography variant="body1" component="div">
                {username}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Fade>
    </>
  );
};
