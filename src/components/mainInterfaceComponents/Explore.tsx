import { useEffect, useState } from "react";
import { useIonPicker } from "@ionic/react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Chip, Grow, IconButton, Paper, Stack } from "@mui/material";
import { ExploreAddModal } from "./ExploreComponents/ExploreAddModal";
import OfferCard from "./Cards/OfferCard";
import cities, { getCityTextFromValue } from "./variables/cities";

import { auth, getAllOffers, searchOffer } from "../../Firebase/Firebase";
import { OfferModal } from "./Schemas/Offer";
import { useAuthState } from "react-firebase-hooks/auth";

const Explore: React.FC = () => {
  const [presentPicker] = useIonPicker();
  const [start, setStart] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);
  const [finish, setFinish] = useState("");
  const [addOfferModal, setAddOfferModal] = useState(false);
  const [offers, setOffers] = useState<Array<OfferModal>>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const addOfferHandler = () => {
    setAddOfferModal(true);
  };
  useEffect(() => {
    async function prepareOffers() {
      setLoading(true);
      const snapshot = await getAllOffers();
      setLoading(false);
      const temp = snapshot.map((offer, index) => {
        return {
          username: offer.username,
          car: offer.car,
          date: offer.date,
          finish: offer.finish,
          img: offer.img,
          index: index,
          isExpired: offer.isExpired,
          offerId: offer.offerId,
          spots: offer.spots,
          start: offer.start,
        };
      });
      setOffers(temp);
    }
    prepareOffers();
  }, [user, loadingAuth, addOfferModal]);
  const goSearch = async (start: string, finish: string) => {
    setLoading(true);
    setIsSearching(true);
    const snapshot = await searchOffer(start, finish);
    setLoading(false);
    const temp = snapshot.map((offer, index) => {
      return {
        username: offer.username,
        car: offer.car,
        date: offer.date,
        finish: offer.finish,
        img: offer.img,
        index: index,
        isExpired: offer.isExpired,
        offerId: offer.offerId,
        spots: offer.spots,
        start: offer.start,
      };
    });
    setOffers(temp);
  };
  const revertSearch = async () => {
    setLoading(true);
    setIsSearching(false);
    const snapshot = await getAllOffers();
    setLoading(false);
    const temp = snapshot.map((offer, index) => {
      return {
        username: offer.username,
        car: offer.car,
        date: offer.date,
        finish: offer.finish,
        img: offer.img,
        index: index,
        isExpired: offer.isExpired,
        offerId: offer.offerId,
        spots: offer.spots,
        start: offer.start,
      };
    });
    setOffers(temp);
  };
  const searchHandler = () => {
    presentPicker({
      buttons: [
        {
          text: "Confirmer",
          handler: (selected) => {
            setStart(selected.start.value);
            setFinish(selected.finish.value);
            goSearch(selected.start.value, selected.finish.value);
          },
        },
      ],
      columns: [
        {
          name: "start",
          options: cities,
        },
        {
          name: "finish",
          options: cities,
        },
      ],
    });
  };
  const actions = [
    {
      icon: <SearchIcon />,
      name: "Trouver un Offre",
      handler: searchHandler,
    },
    {
      icon: <AddIcon />,
      name: "Ajouter un offre",
      handler: addOfferHandler,
    },
  ];
  const handleCancelSearch = async () => {
    revertSearch();
  };
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 75, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handler}
          />
        ))}
      </SpeedDial>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Box m={1}>
        <Stack spacing={1}>
          {offers.map((offer) => {
            return (
              <OfferCard
                key={offer.offerId}
                username={offer.username}
                img={offer.img}
                car={offer.car}
                date={offer.date}
                start={offer.start}
                nbPlaces={offer.spots}
                finish={offer.finish}
                index={offer.index}
                offerId={offer.offerId}
              />
            );
          })}
        </Stack>
      </Box>
      <ExploreAddModal isOpen={addOfferModal} setModal={setAddOfferModal} />
      <Grow in={isSearching}>
        <IconButton
          aria-label="stop"
          sx={{ position: "fixed", bottom: 75, right: 75 }}
        >
          <Paper sx={{ borderRadius: 12 }}>
            <Chip
              label={
                getCityTextFromValue(start) + "-" + getCityTextFromValue(finish)
              }
              onDelete={handleCancelSearch}
              size="medium"
            />
          </Paper>
        </IconButton>
      </Grow>
    </>
  );
};

export default Explore;
