import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MyReservationsCard } from "../Cards/MyReservationsCard";

import {
  auth,
  cancelReservation,
  getReservationsByUser,
} from "../../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { OfferModal } from "../Schemas/Offer";
export const MyReservations: React.FC = () => {
  const [currentOfferId, setCurrentOfferId] = useState("0");
  const [openDelete, setOpenDelete] = useState(false);
  const [user, loadingAuth, error] = useAuthState(auth);
  const [reservations, setReservations] = useState<Array<OfferModal>>([]);
  const [loading, setLoading] = useState(false);

  async function getReservations() {
    if (user === null || user === undefined) return;
    setLoading(true);
    const reservationsTemp = await getReservationsByUser(user.uid);
    setLoading(false);
    setReservations(reservationsTemp || []);
  }

  const handleDeleteClose = async () => {
    setOpenDelete(false);
    await cancelReservation(currentOfferId);
    getReservations();
  };

  const onDelete = (offerId: string | undefined) => {
    if (offerId !== undefined) setCurrentOfferId(offerId);
    setOpenDelete(true);
  };

  useEffect(() => {
    getReservations();
  }, [loadingAuth, user]);

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%", position: "absolute" }}>
          <LinearProgress />
        </Box>
      )}
      <Stack spacing={1} sx={{ p: 1 }}>
        {reservations.map((reserv, index) => {
          return (
            <MyReservationsCard
              key={reserv.offerId}
              offerId={reserv.offerId}
              username={reserv.username}
              img={reserv.img}
              car={reserv.car}
              date={reserv.date}
              start={reserv.start}
              spots={reserv.spots}
              finish={reserv.finish}
              index={index}
              isExpired={reserv.isExpired}
              onDelete={onDelete}
            />
          );
        })}
      </Stack>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr d'annuler votre résérvation ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Oui</Button>
          <Button onClick={() => setOpenDelete(false)} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
