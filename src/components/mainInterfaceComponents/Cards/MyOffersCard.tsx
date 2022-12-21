import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { Offer } from "../Schemas/Offer";
import { getCityTextFromValue } from "../variables/cities";

interface Props {
  car: string;
  date: string;
  start: string;
  finish: string;
  spots: number;
  offerId: string;
  index?: number;
  isExpired?: boolean;
  onDelete: (id: string) => void;
  onEdit: (offer: Offer) => void;
}

export const MyOffersCard: React.FC<Props> = ({
  car,
  date,
  start,
  finish,
  offerId,
  spots,
  index,
  isExpired,
  onDelete,
  onEdit,
}) => {
  const [checked, setChecked] = useState(false);
  const [expired, setExpired] = useState(
    isExpired === undefined ? false : isExpired
  );
  useEffect(() => {
    setChecked(true);
  }, []);
  const delay = index ? index * 1000 : 0;
  return (
    <>
      <Fade
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: delay } : {})}
      >
        <Card elevation={4}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Date : {date}
              </Typography>
              <Typography variant="body1" color="text.primary" component="div">
                Départ - {getCityTextFromValue(start)}
              </Typography>
              <Typography variant="body1" color="text.primary" component="div">
                Arrivée - {getCityTextFromValue(finish)}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Voiture : {car}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
                height: 45,
                mt: 4,
                mr: 2,
              }}
            >
              {!expired ? (
                <>
                  <IconButton
                    aria-label="Modifier"
                    size="large"
                    onClick={() => {
                      onEdit({ car, date, start, finish, offerId, spots });
                    }}
                  >
                    <EditIcon color="info" />
                  </IconButton>
                  <Divider orientation="vertical" variant="fullWidth" />
                  <IconButton
                    aria-label="Supprimer"
                    size="large"
                    onClick={() => {
                      onDelete(offerId);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              ) : (
                <Typography
                  variant="subtitle2"
                  color="darkred"
                  component="div"
                  sx={{ ml: 2, mt: 3 }}
                >
                  Expirée
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      </Fade>
    </>
  );
};
