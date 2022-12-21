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
import { MyOffersCard } from "../Cards/MyOffersCard";
import { EditOfferModal } from "./EditOfferModal";
import { Offer, OfferModal } from "../Schemas/Offer";
import { auth, deleteOffer, getOffersByUser } from "../../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const MyOffers: React.FC = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [editOfferOpen, setEditOfferOpen] = useState(false);
  const [offers, setOffers] = useState<Array<OfferModal>>([]);
  const [loading, setLoading] = useState(false);
  const [user, loadingAuth, error] = useAuthState(auth);

  const [currentOfferId, setCurrentOfferId] = useState("");

  const [currentOffer, setCurrentOffer] = useState<Offer>({
    car: "",
    start: "",
    finish: "",
    date: "",
    offerId: "",
    spots: 0,
  });

  async function getMyOffers() {
    let tempArray = Array<Offer>();
    if (user === null || user === undefined) return;
    setLoading(true);
    const myOffers = await getOffersByUser(user.uid);
    setLoading(false);
    tempArray = myOffers.map((offer, index) => {
      return {
        car: offer.car,
        date: offer.date,
        finish: offer.finish,
        offerId: offer.offerId,
        spots: offer.spots,
        start: offer.start,
      };
    });
    setOffers(tempArray);
  }

  useEffect(() => {
    getMyOffers();
  }, [loadingAuth, user]);

  const handleDeleteClose = async () => {
    setOpenDelete(false);
    await deleteOffer(currentOfferId);
    getMyOffers();
  };

  const onDelete = (offerId: string) => {
    setCurrentOfferId(offerId);
    setOpenDelete(true);
  };

  const onEdit = (offer: Offer) => {
    setCurrentOffer({
      car: offer.car,
      date: offer.date,
      start: offer.start,
      finish: offer.finish,
      offerId: offer.offerId,
      spots: offer.spots,
    });
    setEditOfferOpen(true);
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%", position: "absolute" }}>
          <LinearProgress />
        </Box>
      )}
      <Stack spacing={1} sx={{ p: 1 }}>
        {offers.map((offer, index) => {
          return (
            <MyOffersCard
              key={offer.offerId}
              start={offer.start || ""}
              finish={offer.finish || ""}
              offerId={offer.offerId || ""}
              date={offer.date || ""}
              car={offer.car || ""}
              spots={offer.spots || 0}
              index={index}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </Stack>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de supprimer cet offre ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Oui</Button>
          <Button onClick={() => setOpenDelete(false)} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>

      <EditOfferModal
        isOpen={editOfferOpen}
        setModal={setEditOfferOpen}
        offer={currentOffer}
      />
    </>
  );
};
