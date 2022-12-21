import {
  Card,
  Box,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  Fade,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getCityTextFromValue } from "../variables/cities";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, bookOffer } from "../../../Firebase/Firebase";
import { useIonToast } from "@ionic/react";

interface ComponentProps {
  username?: string;
  img?: string;
  car?: string;
  start?: string;
  finish?: string;
  date?: string;
  offerId?: string;
  index?: number;
  nbPlaces?: number;
}

const OfferCard: React.FC<ComponentProps> = ({
  username,
  img,
  car,
  start,
  finish,
  date,
  nbPlaces,
  offerId,
  index,
}) => {
  const [checked, setChecked] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [present, dismiss] = useIonToast();

  const handleBookClose = async () => {
    setOpenBook(false);
    if (user === null || user === undefined || offerId === undefined) {
      present("Une erreur est survenue");
      return;
    }
    await bookOffer(user.uid, offerId);
    present("Réservation Réussie", 3000);
  };
  useEffect(() => {
    setTimeout(() => setChecked(true), 250);
  }, []);
  const delay = index ? index * 600 : 0;
  return (
    <>
      <Fade
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: delay } : {})}
      >
        <Card elevation={4}>
          <CardActionArea
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px",
            }}
            onClick={() => setOpenBook(true)}
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
                  Places : {nbPlaces}
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
          </CardActionArea>
        </Card>
      </Fade>
      <Dialog open={openBook} onClose={() => setOpenBook(false)}>
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment reserver cet offre ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookClose}>Oui</Button>
          <Button onClick={() => setOpenBook(false)} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OfferCard;
